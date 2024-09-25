require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { dbConnection } = require('./database/config');

// Crear un servidor de express
const app = express();

// Configuración de CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas
app.use( '/api/users', require('./routes/user-routes') );
app.use( '/api/auth', require('./routes/auth-routes') );
app.use( '/api/hospitals', require('./routes/hospitals-routes') );
app.use( '/api/doctors', require('./routes/doctors-routes') );

app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});