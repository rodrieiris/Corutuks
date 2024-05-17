const express = require('express');
const router = express.Router();

// Importamos los routers de cada entidad
const usuariosRouter = require('./usuarios');
const reservasRouter = require('./reservas');
const pasarelasPagoRouter = require('./pasarelasPago');
const correosConfirmacionRouter = require('./correosConfirmacion');

// Rutas para cada entidad
router.use('/usuarios', usuariosRouter);
router.use('/reservas', reservasRouter);
router.use('/pasarelasPago', pasarelasPagoRouter);
router.use('/correosConfirmacion', correosConfirmacionRouter);

module.exports = router;