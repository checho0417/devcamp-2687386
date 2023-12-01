const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

// middleware para proteger las rutas a usuarios no logueados
exports.protect = async(req, res, next) => {

    try {
        let token
        //1. Verificar si existe el header 'Authorization'
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if(!token){
            return res.status(401).json({
                
                success: false,
                msg: "USUARIO NO ENCONTRADO"
            })
        }else {
            const decoded= jwt.verify(token, process.env.JWT_SECRET_KEY)
            //console.log(decoded)
            //añadir al request el "user"
            req.user = await usersModel.findById(decoded.id)

            //redirigir al crear boocamps 
            next()
        }
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// Middleware para proteger de usuarios que no tengan el rol especifico
exports.authorize = (rol) =>  {
    return async(req, res, next) => {
        //Comparar si el rol del parametro es igual al rol del usuario
        if(req.user.role !== rol) {
            res.status(401).json({
                success: false,
                message: 'ROL NO AUTORIZADO'
            })
        }else {
            next()
        }
    }
} 