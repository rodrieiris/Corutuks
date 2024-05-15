const express = require('express');
const router = express.Router();
const pool = require('../conectarDB');

// Crear una nueva transacción de pago
router.post('/nueva-transaccion', async (req, res) => {
    try {
        const { reserva_id, metodo_pago, precio_reserva, estado_pago } = req.body;
        const newTransaccion = { reserva_id, metodo_pago, precio_reserva, estado_pago };
        await pool.query('INSERT INTO pasarelas_pago SET ?', [newTransaccion]);
        res.status(200).json({ message: 'Transacción de pago creada correctamente' });
    } catch (error) {
        console.error('Error al crear transacción de pago:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Obtener todas las transacciones de un usuario
router.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transacciones = await pool.query('SELECT * FROM pasarelas_pago WHERE reserva_id IN (SELECT reserva_id FROM reservas WHERE user_id = ?)', [id]);
        res.status(200).json(transacciones);
    } catch (error) {
        console.error('Error al obtener transacciones de pago:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Obtener detalles de una transacción de pago
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transaccion = await pool.query('SELECT * FROM pasarelas_pago WHERE trasaccion_id = ?', [id]);
        if (transaccion.length === 0) {
        return res.status(404).json({ message: 'Transacción de pago no encontrada' });
        }
        res.status(200).json(transaccion[0]);
    } catch (error) {
        console.error('Error al obtener detalles de transacción de pago:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
