const express = require('express');
const router = express.Router();

// Importar los routers de cada entidad
const usuariosRouter = require('./usuarios'); // Router para las operaciones relacionadas con usuarios
const reservasRouter = require('./reservas'); // Router para las operaciones relacionadas con reservas
const pasarelasPagoRouter = require('./pasarelasPago'); // Router para las operaciones relacionadas con pasarelas de pago
const correosConfirmacionRouter = require('./correosConfirmacion'); // Router para las operaciones relacionadas con correos de confirmación
const sesionGoogleRouter = require('./sesionGoogle'); // Router para las operaciones relacionadas con sesiones de Google

// Rutas para cada entidad
router.use('/usuarios', usuariosRouter); // Rutas relacionadas con usuarios
router.use('/reservas', reservasRouter); // Rutas relacionadas con reservas
router.use('/pasarelasPago', pasarelasPagoRouter); // Rutas relacionadas con pasarelas de pago
router.use('/correosConfirmacion', correosConfirmacionRouter); // Rutas relacionadas con correos de confirmación
router.use('/sesionGoogle', sesionGoogleRouter); // Rutas relacionadas con sesiones de Google

module.exports = router;
