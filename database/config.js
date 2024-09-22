const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {
        await mongoose.connect('mongodb+srv://U2D8Bits:Lolxdxd12%40@cluster0.wfxdq.mongodb.net/hospitaldb');
        console.log('DB Online');
        
    } catch (error) {
        
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');

    }
    
}

module.exports = {
    dbConnection
}
