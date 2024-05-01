// Importar Express
const express = require('express');

// Importar el middleware para habilitar CORS (Cross-Origin Resource Sharing)
const cors = require('cors');

// Importar mariadb para conectarse a la base de datos MariaDB
const mariadb = require('mariadb');

// Importar las rutas definidas para los usuarios y las reservas de viajes
const usersRoutes = require('./routes/users');
const reservasRoutes = require('./routes/reservas');

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 5000;

// Datos de conexión a la base de datos MariaDB
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// Crear una instancia de la aplicación Express
const app = express();

// Habilitar CORS en la aplicación Express
app.use(cors());

// Habilitar el middleware para el análisis de datos JSON
app.use(express.json());

// Función para conectar con la base de datos MariaDB
async function conectarDB() {
    try {
        // Crear una pool de conexiones a la base de datos MariaDB
        const pool = mariadb.createPool({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE
        });

        // Verificar la conexión con la bbdd
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida');

        // Middleware para agregar la conexión a la base de datos a cada solicitud
        app.use((req, res, next) => {
            req.db = connection;
            next();
        });

        // Utilizar las nuevas rutas de usuarios y reservas
        //app.use('/api/users', usersRoutes);
        //app.use('/api/reservas', reservasRoutes);
        app.use('/users', usersRoutes);
        app.use('/reservas', reservasRoutes);

        // Iniciar el servidor Express
        app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));
    } catch (error) {
        // Manejar errores de conexión a la base de datos
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1); // Salir del proceso con un código de error
    }
}

// Llamar a la función para conectar con la base de datos
conectarDB();