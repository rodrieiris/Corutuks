const express = require('express');
const router = express.Router();
const pool = require('../conectarDB');

// Crear inicio de sesión de Google
router.post('/login', async (req, res) => {
  try {
    const { user_id } = req.body;
    await pool.query('INSERT INTO sesion_google (user_id) VALUES (?)', [user_id]);
    res.status(200).json({ message: 'Inicio de sesión de Google creado correctamente' });
  } catch (error) {
    console.error('Error al crear inicio de sesión de Google:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Obtener todos los inicios de sesión de Google
router.get('/', async (req, res) => {
  try {
    const sesionesGoogle = await pool.query('SELECT * FROM sesion_google');
    res.status(200).json(sesionesGoogle);
  } catch (error) {
    console.error('Error al obtener inicios de sesión de Google:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Eliminar inicio de sesión de Google por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM sesion_google WHERE google_login_id = ?', [id]);
    res.status(200).json({ message: 'Inicio de sesión de Google eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar inicio de sesión de Google:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
