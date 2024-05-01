const express = require('express'); // Importar Express
const router = express.Router(); // Crear un enrutador utilizando express.Router()
const bcrypt = require('bcrypt'); // Importar bcrypt para encriptar contraseñas
const jwt = require('jsonwebtoken'); // Importar jwt para la generación y verificación de tokens

// Middleware para verificar tokens de acceso
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Obtener el token de la cabecera de la solicitud

    if (!token) { // Si no se proporciona un token
        return res.status(401).json({ message: 'Token de acceso no proporcionado' }); // Devolver un error de no autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { // Verificar el token de acceso
        if (err) { // Si hay un error al verificar el token
            return res.status(401).json({ message: 'Token de acceso inválido' }); // Devolver un error de no autorizado
        }
        req.userId = decoded.userId; // Agregar el ID de usuario decodificado al objeto de solicitud
        next(); // Llamar al siguiente middleware
    });
};

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try { // Manejar cualquier error
        const { nombre, apellidos, email, password, telefono, direccion, ciudad, pais } = req.body; // Obtener los datos del cuerpo de la solicitud

        // Validar los datos de entrada
        if (!nombre || !apellidos || !email || !password || !telefono || !direccion || !ciudad || !pais) {
            return res.status(400).json({ message: 'Por favor, proporciona nombre, apellidos, email, contraseña, teléfono, dirección, ciudad y país' });
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await req.db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Ya existe un usuario con este correo electrónico' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar un nuevo usuario en la base de datos
        await req.db.query(`INSERT INTO usuarios (nombre, apellidos, email, password, telefono, direccion, ciudad, pais) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [nombre, apellidos, email, hashedPassword, telefono, direccion, ciudad, pais]);

        res.status(201).json({ message: 'Usuario registrado correctamente' }); // Devolver un mensaje de éxito
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al crear un usuario:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try { // Manejar cualquier error
        const { email, password } = req.body; // Obtener los datos del cuerpo de la solicitud

        // Buscar el usuario por su correo electrónico
        const user = await req.db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);

        if (user.length === 0) { // Si no existe el usuario
            return res.status(401).json({ message: 'Credenciales inválidas' }); // Devolver un error de no autorizado
        }

        // Comparar la contraseña
        const passwordMatch = await bcrypt.compare(password, user[0].password);
        if (!passwordMatch) { // Si las contraseñas no coinciden
            return res.status(401).json({ message: 'Credenciales inválidas' }); // Devolver un error de no autorizado
        }

        // Generar un token de acceso
        const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token }); // Devolver el token de acceso
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al iniciar sesión:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try { // Manejar cualquier error
        const users = await req.db.query(`SELECT * FROM usuarios`); // Obtener todos los usuarios de la base de datos

        res.json(users); // Devolver los usuarios
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al obtener todos los usuarios:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta protegida que requiere autenticación
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida, solo accesible con un token de acceso válido' }); // Devolver un mensaje de éxito
});

// Ruta para obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try { // Manejar cualquier error
        const userId = req.params.id; // Obtener el ID de usuario de los parámetros de la URL
        const user = await req.db.query(`SELECT * FROM usuarios WHERE id = ?`, [userId]); // Buscar un usuario por su ID en la base de datos

        if (user.length === 0) { // Si no se encuentra el usuario
            return res.status(404).json({ message: 'Usuario no encontrado' }); // Devolver un error de no encontrado
        }

        res.json(user[0]); // Devolver el usuario encontrado
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al obtener un usuario por ID:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para actualizar un usuario por ID
router.put('/:id', verifyToken, async (req, res) => {
    try { // Manejar cualquier error
        const userId = req.params.id; // Obtener el ID de usuario de los parámetros de la URL
        const { nombre, apellidos, email, password, telefono, direccion, ciudad, pais } = req.body; // Obtener los datos actualizados del usuario del cuerpo de la solicitud

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Definir el objeto de actualización con los nuevos datos del usuario
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

        // Actualizar el usuario en la base de datos
        await req.db.query(`UPDATE usuarios SET ? WHERE id = ?`, [updatedUser, userId]);

        res.json({ message: 'Usuario actualizado correctamente' }); // Devolver un mensaje de éxito
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al actualizar un usuario por ID:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para eliminar un usuario por ID
router.delete('/:id', verifyToken, async (req, res) => {
    try { // Manejar cualquier error
        const userId = req.params.id; // Obtener el ID de usuario de los parámetros de la URL

        // Eliminar el usuario de la base de datos
        await req.db.query(`DELETE FROM usuarios WHERE id = ?`, [userId]);

        res.json({ message: 'Usuario eliminado correctamente' }); // Devolver un mensaje de éxito
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al eliminar un usuario por ID:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

module.exports = router; // Exportar el enrutador para que esté disponible para otros módulos de la aplicación web