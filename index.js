const express = require('express');

// Crear un servidor de express
const app = express();

app.listen( 3001, () => {
    console.log('Servidor en puerto 3001');
});