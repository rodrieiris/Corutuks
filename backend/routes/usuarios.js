const express = require('express'); // Importamos Express
const router = express.Router(); // Creamos un enrutador utilizando express.Router()
const pool = require('../conectarDB'); // Conexión con la BBDD
const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Importamos jwt para la generación y verificación de tokens

// Función para generar un token JWT
const generarToken = (user) => {
    const payload = {
        user_id: user.user_id
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware para verificar tokens de acceso
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Obtenemos el token de la cabecera de la solicitud

    if (!token) { // Si no se proporciona un token
        return res.status(401).json({ message: 'Token de acceso no proporcionado' }); // Devolvemos un error de no autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Verificamos el token de acceso
        if (err) { // Si hay un error al verificar el token
            return res.status(401).json({ message: 'Token de acceso inválido' }); // Devolvemos un error de no autorizado
        }
        req.user_id = decoded.user_id; // Agregamos el ID de usuario decodificado al objeto de solicitud
        next();
    });
};

// Ruta para registrar un nuevo usuario
router.post('/registro', async (req, res) => {
    // Manejamos posibles errores
    try {
        const { nombre, apellidos, email, password, telefono, direccion, ciudad, pais } = req.body; // Obtenemos los datos del cuerpo de la solicitud
        // Validamos los datos de entrada
        if (!nombre || !apellidos || !email || !password || !telefono || !direccion || !ciudad || !pais) {
            return res.status(400).json({ message: 'Por favor, completa todos los campos' });
        }

        // Verificamos si ya existe un usuario con el mismo correo electrónico
        const existingUser = await pool.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico' });
        }

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertamos un nuevo usuario en la BBDD
        await pool.query(`INSERT INTO usuarios (nombre, apellidos, email, password, telefono, direccion, ciudad, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellidos, email, hashedPassword, telefono, direccion, ciudad, pais]);

        const newUser = {
            user_id: result.insertId,
            nombre,
            apellidos,
            email,
            telefono,
            direccion,
            ciudad,
            pais
        };
    
        const token = generarToken(newUser);
        
        res.json({ token });
        res.status(201).json({ message: 'Usuario registrado correctamente' }); // Devolvemos un mensaje de éxito
    } catch (error) { // Manejamos cualquier error interno del servidor
        console.error('Error al crear un usuario:', error); // Registramos el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscar el usuario por su correo electrónico
        const user = await pool.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);

        if (user.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        // Verificamos la contraseña
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) { // Si las contraseñas no coinciden
            return res.status(401).json({ message: 'Usiario o contraseña incorrectas' });
        }

        // Generamos un token JWT
        const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener todos los usuarios
router.get('/usuarios', verifyToken, async (req, res) => {
    try {
        const usuarios = await pool.query(`SELECT * FROM usuarios`);

        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener todos los usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para obtener un usuario por ID
router.get('/:user_id', verifyToken, async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const usuarios = await pool.query(`SELECT * FROM usuarios WHERE user_id = ?`, [user_id]);

        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(usuarios[0]); // Devolvemos el usuario encontrado
    } catch (error) {
        console.error('Error al obtener un usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para actualizar un usuario por ID
router.put('/:user_id', verifyToken, async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { nombre, apellidos, email, password, telefono, direccion, ciudad, pais } = req.body;

        // Hasheamos la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Definimos el objeto de actualización con los nuevos datos del usuario
        const updatedUser = {
            nombre,
            apellidos,
            email,
            password: hashedPassword,
            telefono,
            direccion,
            ciudad,
            pais
        };

        // Actualizar el usuario en la BBDD
        await pool.query(`UPDATE usuarios SET ? WHERE id = ?`, [updatedUser, user_id]);

        res.json({ message: 'Usuario actualizado correctamente' }); // Devolvemos un mensaje de éxito
    } catch (error) {
        console.error('Error al actualizar un usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:user_id', verifyToken, async (req, res) => {
    try {
        const user_id = req.params.id;

        // Eliminar el usuario de la BBDD
        await pool.query(`DELETE FROM usuarios WHERE id = ?`, [user_id]);

        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar un usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router; // Exportar el enrutador para que esté disponible para otros módulos de la aplicación web