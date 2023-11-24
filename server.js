const express=require('express');
const dotenv=require('dotenv');
const colors = require('colors'); //Para poner color a lo que pasa en consola
const conectarDB = require('./config/db'); // Importando funcion de conectar DB
//Dependencias de rutas
const bootcampsRoutes = require('./routes/bootcampsRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
const reviewRoutes = require('./routes/reviewsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const cookieParser = require('cookie-parser')


//Vincular en archivo .env
dotenv.config(
    { 'path' : './config/.env' }
);

// CONECTAR A LA BD
conectarDB()

// Construir objeto app
const app = express()
app.use(express.json())
app.use(cookieParser())

// Conectar las rutas al objeto app
app.use('/api/v1/devcamp/bootcamps', bootcampsRoutes)
app.use('/api/v1/devcamp/courses', coursesRoutes)
app.use('/api/v1/devcamp/reviews', reviewRoutes)
app.use('/api/v1/devcamp/auth', usersRoutes)

//Rutas de prueba
app.get('/prueba', (request, response) => {
    response.send('Hola')
});

// app.get('/prueba/:id', (request, response) => {
//     response.send(`Hola, ${request.params.id}`)
// });



app.listen(process.env.PUERTO, () => {
    console.log(`Servidor en ejecucion ${process.env.PUERTO}`.bgGreen.bold)
});

