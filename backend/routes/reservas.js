const express = require('express'); // Importar Express
const router = express.Router(); // Crear un enrutador de Express
const jwt = require('jsonwebtoken'); // Importar jwt para la generación y verificación de tokens

// Middleware para verificar token de acceso
const verifyToken = (req, res, next) => { // Middleware para verificar tokens de acceso
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

// Ruta para obtener todas las reservas de un usuario
router.get('/', verifyToken, async (req, res) => { // Ruta para obtener todas las reservas de un usuario
    try { // Manejar cualquier error
        const userId = req.userId; // Obtener el ID de usuario del token de acceso
        const reservas = await req.db.query(`SELECT * FROM reservas WHERE usuario_id = ?`, [userId]); // Buscar todas las reservas del usuario en la base de datos

        res.json(reservas); // Devolver las reservas encontradas
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al obtener las reservas del usuario:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para crear una nueva reserva
router.post('/', verifyToken, async (req, res) => { // Ruta para crear una nueva reserva
    try { // Manejar cualquier error
        const userId = req.userId; // Obtener el ID de usuario del token de acceso
        const { fecha, hora, ruta, pasajeros, precioTotal, estado } = req.body; // Obtener los datos del cuerpo de la solicitud

        // Crear una nueva reserva
        const nuevaReserva = {
            usuario_id: userId,
            fecha,
            hora,
            ruta,
            pasajeros,
            precio_total: precioTotal,
            estado
        };

        // Insertar la nueva reserva en la base de datos
        await req.db.query(`INSERT INTO reservas SET ?`, [nuevaReserva]);

        res.status(201).json({ message: 'Reserva creada correctamente' }); // Devolver la reserva creada
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al crear una nueva reserva:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para obtener una reserva por ID
router.get('/:id', verifyToken, async (req, res) => { // Ruta para obtener una reserva por ID
    try { // Manejar cualquier error
        const userId = req.userId; // Obtener el ID de usuario del token de acceso
        const reservaId = req.params.id; // Obtener el ID de reserva de los parámetros de la URL

        // Buscar la reserva por ID y usuario ID
        const reserva = await req.db.query(`SELECT * FROM reservas WHERE id = ? AND usuario_id = ?`, [reservaId, userId]);

        if (reserva.length === 0) { // Si no se encuentra la reserva
            return res.status(404).json({ message: 'Reserva no encontrada' }); // Devolver un error de no encontrado
        }

        res.json(reserva[0]); // Devolver la reserva encontrada
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al obtener una reserva por ID:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para actualizar una reserva por ID
router.put('/:id', verifyToken, async (req, res) => { // Ruta para actualizar una reserva por ID
    try { // Manejar cualquier error
        const userId = req.userId; // Obtener el ID de usuario del token de acceso
        const reservaId = req.params.id; // Obtener el ID de reserva de los parámetros de la URL
        const { fecha, hora, ruta, pasajeros, precioTotal, estado } = req.body; // Obtener los datos actualizados de la reserva del cuerpo de la solicitud

        // Definir el objeto de actualización con los nuevos datos de la reserva
        const reservaActualizada = {
            fecha,
            ruta,
            hora,
            pasajeros,
            precio_total: precioTotal,
            estado,
        };

        // Actualizar la reserva en la base de datos
        await req.db.query(`UPDATE reservas SET ? WHERE id = ? AND usuario_id = ?`, [reservaActualizada, reservaId, userId]);

        res.json({ message: 'Reserva actualizada correctamente' }); // Devolver un mensaje de éxito
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al actualizar una reserva por ID:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

// Ruta para eliminar una reserva por ID
router.delete('/:id', verifyToken, async (req, res) => { // Ruta para eliminar una reserva por ID
    try { // Manejar cualquier error
        const userId = req.userId; // Obtener el ID de usuario del token de acceso
        const reservaId = req.params.id; // Obtener el ID de reserva de los parámetros de la URL

        // Eliminar la reserva de la base de datos
        await req.db.query(`DELETE FROM reservas WHERE id = ? AND usuario_id = ?`, [reservaId, userId]);

        res.json({ message: 'Reserva eliminada correctamente' }); // Devolver un mensaje de éxito
    } catch (error) { // Manejar cualquier error interno del servidor
        console.error('Error al eliminar una reserva por ID:', error); // Registrar el error en la consola
        res.status(500).json({ message: 'Error interno del servidor' }); // Devolver un error interno del servidor
    }
});

module.exports = router; // Exportar el enrutador para que esté disponible para otros módulos de la aplicación web