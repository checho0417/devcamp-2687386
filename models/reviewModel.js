const mongoose= require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true, 
            "Titulo Requerido" 
        ],
        maxlenght: [
            2, "Máximo 20 caracteres"
        ]
    },
    text: {
        type: String,
        required: [
            true, 
            "Texto Requerido" 
        ],
        maxlenght: [
            50, "Máximo 50 caracteres"
        ]
    },
    rating: {
        type: Number,
        required: [
            true, 
            "Calificación Requerida" 
        ],
        max: [
            10, "no debe ser mayor a 10"
        ]
        ,
        min: [
            1, "Debe ser minimo de 1"
        ]
    }
})

module.exports = mongoose.model('review', reviewSchema)