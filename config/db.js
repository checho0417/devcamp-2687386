const mongoose = require ('mongoose');

const conectarDB = async()  => {
    await mongoose.connect(process.env.MONGO_URL); //Para conectarse a una base de datos en mongoDB
    console.log('MongoDB conectado'.bgBlue.red);
}

module.exports = conectarDB