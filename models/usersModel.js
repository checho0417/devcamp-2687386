const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true, "Nombre requerido"
        ]
    },
    email: {
        type: String,
        unique: true,
        required: [
            true, "email requerido"
        ],
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Email invalido"
        ]
    },
    password: {
        type: String,
        required: [
            true, "Contraseña requerida"
        ],
        maxlength: [6, "contraseña muy debil"],
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "user", "publisher"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(){
    // Generar la técnica de sal
    const sal = await bcryptjs.genSalt(10, this.password)
    // Encriptar el password
    this.password = await bcryptjs.hash(this.password, sal)
})

// Método para comparar la password del usuario VS password del payload
userSchema.methods.compararPassword = async function(password) {
    return bcryptjs.compare(password, this.password)
}

// Método ara crear el JSON Web Token (JWT)
userSchema.methods.generarJWT = function() {
    return jwt.sign({
        id: this._id,
        email: this.email
        },
        process.env.JWT_SECRET_KEY,
        {
        expiresIn: process.env.JWT_EXPIRE
        })
}

module.exports = mongoose.model('User', userSchema)