const express = require('express');
const router = express.Router();
const pool = require('../conectarDB');
const nodemailer = require('nodemailer');

// Enviar correo de confirmación de reserva
router.post('/correo-confirmacion', async (req, res) => {
    try {
        const { nombre, apellidos, email, fecha_reserva, hora_reserva, destino_reserva, numero_personas, estado_reserva } = req.body;

        // Configurar transporte de correo
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Configurar correo electrónico
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Confirmación de reserva',
            html: `<p>Hola ${nombre} ${apellidos},</p>
                    <p>Tu reserva ha sido confirmada.</p>
                    <p>Detalles de la reserva:</p>
                    <p>Fecha: ${fecha_reserva}</p>
                    <p>Hora: ${hora_reserva}</p>
                    <p>Destino: ${destino_reserva}</p>
                    <p>Número de personas: ${numero_personas}</p>
                    <p>Estado: ${estado_reserva}</p>`
        };

        // Enviar correo electrónico
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo electrónico enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar correo electrónico:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
