const express = require('express');
const router = express.Router();
const pool = require('../conectarDB');
const jwt = require('jsonwebtoken');

// Middleware para verificar tokens de acceso
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) { // Si no se proporciona un token
        return res.status(401).json({ message: 'Token de acceso no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token de acceso inválido' });
        }
        req.user_id = decoded.user_id;
        next();
    });
};

// Ruta para registrar una nueva reserva
router.post('/nueva-reserva', verifyToken, async (req, res) => {
    try {
        const { user_id, fecha_reserva, hora_reserva, destino_reserva, numero_personas, estado_reserva } = req.body;
        const newReserva = { user_id, fecha_reserva, hora_reserva, destino_reserva, numero_personas, estado_reserva };
        await pool.query('INSERT INTO reservas SET ?', [newReserva]);
        res.status(200).json({ message: 'Reserva creada correctamente' });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener todas las reservas de un usuario
router.get('/usuario/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const reservas = await pool.query('SELECT * FROM reservas WHERE user_id = ?', [id]);
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener detalles de una reserva
router.get('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await pool.query('SELECT * FROM reservas WHERE reserva_id = ?', [id]);
        if (reserva.length === 0) {
        return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva[0]);
    } catch (error) {
        console.error('Error al obtener detalles de reserva:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para actualizar una reserva
router.put('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const { fecha_reserva, hora_reserva, destino_reserva, numero_personas, estado_reserva } = req.body;
        const updatedReserva = { fecha_reserva, hora_reserva, destino_reserva, numero_personas, estado_reserva };
        await pool.query('UPDATE reservas SET ? WHERE reserva_id = ?', [updatedReserva, id]);
        res.status(200).json({ message: 'Reserva actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para eliminar una reserva
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM reservas WHERE reserva_id = ?', [id]);
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar reserva:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;