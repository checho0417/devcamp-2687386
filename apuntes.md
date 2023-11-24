mkdir "nombre_carpeta"--> Crear carpeta
cd "nombre_carpeta" --> Acceder carpeta
*npm init -y  --> Crear JSON
*code . --> abrir visual
*npm i express dotenv colors --> Instalar dependencias
*npm install -D nodemon --> Instalar Nodemon


"main": "index.js",  --> ANTES
"main": "server.js", --> DESPUES

*Crear archivo llamado server.js en la raiz del proyecto*

*En "scripts" borrar esto:"echo \"Error: no test specified\" && exit 1"
Y poner:"nodemon server"
Debe quedar asi:
"scripts": {
    "test": "nodemon server"
  },

*El archivo server para comprobar que funciona debe quedar asi:*
const express=require('express')
console.log('hola')
Y para ejecutar en el cmd poner: npm run test

*Luego ponemos una condicion que si se ejecuta el puerto 5000 EXAMPLE:

app = express()

app.listen(5000, () => {
    console.log('Servidor En Ejecucuion')
})

*Luego se crea una carpeta llamada config 
    - dentro de esta carpeta se crea el archivo .env
    en este archivo declara el puerto asi:
    PUERTO=5000

*Vincular en archivo .env*
dotenv.config(
    { 'path' : './config/.env' }
)

Y luego modificar el puerto del app.listen(5000,() =>{}) por:
 
app.listen(process.env.PUERTO, () => {
    console.log(`Servidor en ejecucion ${process.env.PUERTO}`)
})
Debe salir en la consola: Servidor en ejecucion 5000

*Para poner rutas*
- Ruta de prueba:
app.get('/prueba', (request, response) => {
    response.send('Hola')
});

Y en un navegador poner: http://127.0.0.1:5000/prueba
Deberia de salir un hola

*Ruta parametrizada(Con parametros)*
app.get('/prueba/:id', (request, response) => {
    response.send(`Hola, ${request.params.id}`)
});

En el navegador poner la ruta:http://127.0.0.1:5000/prueba/4

CRUD
cursos-reviews-usuarios