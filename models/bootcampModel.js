const mongoose= require('mongoose')

//definir SCHEMA 

const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, "nombre existente"],
        required: [
            true, 
            "Nombre Requerido" 
        ]
    },
    phone: {
        type: Number,
        required: [
            true, 
            "Telefono Requerido" 
        ],
        max: [
            9999999999, "no debe ser mayor a 10 digitos"
        ]
        ,
        min: [
            11111111, "debe tener almenos 7 digitos"
        ]
    },
    address: {
        type: String,
        required: [
            true, 
            "Direccion Requerido" 
        ]
    },
    topics: {
        type: [String],
        enum: [
            "Backend",
            "Frontend",
            "Devops",
            "AI"
        ]
    },
    createdAt: Date
})

module.exports = mongoose.model('bootcamp', bootcampSchema)