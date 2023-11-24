const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "Nombre ya existente"],
        required: [
            true, "Es necesario el nombre"
        ],
        maxlenght: [
            30, "El titulo no debe ser mayor a 30 caracteres"
        ],
        minlenght: [
            10, "El titulo debe tener minimo 10 caracteres"
        ]
    },
    description: {
        type: String,
        required: [
            true, "Debe tener descirpción"
        ],
        minlenght: [
            10, "El titulo debe tener minimo 10 caracteres"
        ]
    },
    weeks: {
        type: Number,
        required: [
            true, "Las semanas son obligatorias"
        ],
        max: [
            9, "El número máximo de semanas es de 9"
        ]
    },
    enroll_cost: {
        type: Number,
        required: [
            true, "El costo es obligatorio"
        ]
    },
    minium_skill: {
        type: String,
        required: [
            true, "La habiloidad minima es obligatoria"
        ]   
    }

})

module.exports = mongoose.model('course', courseSchema)