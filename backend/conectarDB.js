const mysql = require('mysql'); // Importar el módulo mysql para conectarse a la base de datos
const util = require('util'); // Importar el módulo util para utilizar la función promisify
const dotenv = require('dotenv'); // Importar el módulo dotenv para cargar las variables de entorno desde el archivo .env

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
    connectionLimit: 10, // Establecer el límite de conexiones
    host: process.env.DB_HOST, // Obtener la dirección del servidor de la base de datos desde las variables de entorno
    user: process.env.DB_USER, // Obtener el nombre de usuario de la base de datos desde las variables de entorno
    password: process.env.DB_PASSWORD, // Obtener la contraseña de la base de datos desde las variables de entorno
    database: process.env.DB_DATABASE // Obtener el nombre de la base de datos desde las variables de entorno
});


// Hacemos la conexión con la base de datos
const conectarDB = () => {
    return new Promise((resolve, reject) => {
        // Establece una conexión con la base de datos usando el pool de conexiones
        pool.getConnection((err, connection) => {
            // Comprobamos si nos da algún error al conectarse a la BBDD
            if (err) {
                // Verificamos el tipo de error
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('La conexión a la base de datos fue cerrada.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('La base de datos tiene demasiadas conexiones.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('La conexión a la base de datos fue rechazada.');
                }
                reject(err); // Rechazamos la promesa en caso de que nos de error
            }
            // Si la conexión se establece correctamente, liberamos la conexión al pool
            if (connection) connection.release();
            console.log('¡Conexión a la base de datos establecida!');
            resolve(); // Resolvemos la promesa si la conexión se establece correctamente
        });
    });
};

// Convertimos el método query de MySQL a una versión basada en promesas
pool.query = util.promisify(pool.query);

// Exportamos el pool de conexiones para que pueda ser utilizado en otros archivos
module.exports = { pool, conectarDB };