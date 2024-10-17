require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sirviendo archivos estáticos
app.use(express.static('public'));

// Ruta para mostrar la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para procesar el formulario de contacto
app.post('/contact', async (req, res) => {
    const { nombre, email, mensaje, 'g-recaptcha-response': captcha } = req.body;

    // Verifica si el CAPTCHA fue completado
    if (!captcha) {
        return res.status(400).json({ message: 'Por favor, valida el CAPTCHA.' });
    }

    // Verificar el CAPTCHA con Google reCAPTCHA
    const secretKey = process.env.SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    try {
        const response = await axios.post(verifyUrl);
        const { success } = response.data;

        if (!success) {
            return res.status(400).json({ message: 'Falló la verificación del CAPTCHA. Inténtalo de nuevo.' });
        }

        // Configurar nodemailer para enviar el correo
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: email,
            to: ['info@italzinc.com.ar', 'galvanotecniaitalzinc@gmail.com'],
            subject: `Nuevo mensaje de contacto de ${nombre}`,
            html: `<p><strong>Nombre:</strong> ${nombre}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Mensaje:</strong> ${mensaje}</p>`
        };
        

        await transporter.sendMail(mailOptions);
        // Devolver respuesta de éxito al frontend
        return res.status(200).json({ message: 'Gracias por tu mensaje, nos pondremos en contacto contigo pronto.' });
        
    } catch (error) {
        console.error('Error al verificar CAPTCHA o enviar correo:', error);
        return res.status(500).json({ message: 'Hubo un error en el servidor. Inténtalo más tarde.' });
    }
});



// Función para generar un PIN aleatorio de 4 dígitos
function generatePin() {
    return Math.floor(1000 + Math.random() * 9000); // PIN de 4 dígitos
  }
  
  // Actualizar el PIN cada 30 a 40 segundos
  setInterval(() => {
    currentPin = generatePin();
    console.log(`Nuevo PIN generado: ${currentPin}`);
  }, 30000 + Math.random() * 10000); // Intervalo entre 30 y 40 segundos
  
  // Ruta para obtener el PIN actual
  app.get('/pin', (req, res) => {
    res.json({ pin: currentPin });
  });
  



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
