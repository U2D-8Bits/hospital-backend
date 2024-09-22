const express = require('express');

// Crear un servidor de express
const app = express();

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