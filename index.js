const express = require('express');
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

app.listen( 3001, () => {
    console.log('Servidor en puerto 3001');
});