// Importamos express para crear el servidor
const express = require('express');

// Importamos bodyParser para analizar los cuerpos de las solicitudes HTTP
const bodyParser = require('body-parser');

// Importamos cors para permitir solicitudes de diferentes dominios al servidor
const cors = require('cors');

// Importamos las rutas de la aplicación
const routes = require('./routes/rutasBackend');

// Importamos la función para conectar con la base de datos
const { pool, conectarDB } = require('./conectarDB');

// Creamos una instancia de express
const app = express();

// Middleware para parsear el cuerpo de las solicitudes entrantes como JSON
app.use(express.json());

// Configurar cors para permitir solicitudes de diferentes dominios
app.use(cors());

// Usar las rutas definidas en el archivo routes/rutasBackend.js
app.use('/api', routes);

// Obtener el puerto del entorno o usar el puerto 5000 por defecto
const PORT = process.env.PORT || 5000;

// Función para conectar con la base de datos y manejar reconexiones
const conectarConBaseDeDatosConReintentos = () => {
    conectarDB().catch((error) => {
        console.error('Error al conectar con la base de datos:', error);
        // Intentar reconectar después de un período de tiempo (por ejemplo, 5 segundos)
        setTimeout(conectarConBaseDeDatosConReintentos, 5000); // Reintentar cada 5 segundos
    });
};

// Llamamos a la función para conectar con la BBDD
conectarConBaseDeDatosConReintentos();

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));