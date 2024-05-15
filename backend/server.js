// Importar express para crear el servidor
const express = require('express');

// Importar bodyParser para analizar los cuerpos de las solicitudes HTTP
const bodyParser = require('body-parser');

// Importar cors para permitir solicitudes de diferentes dominios al servidor
const cors = require('cors');

// Importar las rutas de la aplicación
const routes = require('./routes/rutasBackend');

// Crear una instancia de express
const app = express();

// Configurar bodyParser para analizar solicitudes con cuerpo en formato JSON
app.use(bodyParser.json());
// Configurar bodyParser para analizar solicitudes con cuerpo en formato de formulario
app.use(bodyParser.urlencoded({ extended: true }));
// Configurar cors para permitir solicitudes de diferentes dominios
app.use(cors());

// Usar las rutas definidas en el archivo routes/rutasBackend.js
app.use('/api', routes);

// Obtener el puerto del entorno o usar el puerto 5000 por defecto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`));
