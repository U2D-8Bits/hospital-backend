const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config');
// Crear un servidor de express
const app = express();

// Base de datos
dbConnection();
// Rutas
app.get( '/', (req, res)=>{
    
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });


});

app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${process.env.PORT}`);
});