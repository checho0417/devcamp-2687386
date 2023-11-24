const express = require('express'); // Framework
const BootcampModel = require('../models/bootcampModel');
const bootcampModel = require('../models/bootcampModel');
const mongoose = require('mongoose')
// Dependencias al middleware
const { protect, authorize } = require('../middleware/auth')

// Definir el ruteador
const router = express.Router()

//rutas para bootscamps
//endpoint
//Traer todos los bootcamps
router.get('/', async (req, res)=>{

    //utilizar el modelo para seleccionar todos los bootcamps que estan en la bd
    try {
        const bootcamp = await  BootcampModel.find()

        if(bootcamp.length > 0) {
            res.
            status(200).json({
                success: true,
                data: bootcamp
            });
        } else {
            res.status(400).json({
            success: false,
            message: 'No hay bootcamps'
        });
        }
    
        
    } catch (error) {
        
    }
});

// Traer un bootcamp por id
router.get('/:id', async (req, res)=>{

    // Extraer el id del bootcamp ddel parametro de la url

    try {
        const bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "identificador invalido"
            })
       }else{
            const bootcamp = await bootcampModel.findById(bootcampId)

            if(bootcamp){
                res.status(200).json({
                    success: true,
                    data: bootcamp
                })
            }
            else{
                res.
                status(400).
                json({
                    success: false,
                    message: `no hay bootcamp cuyo id es: ${bootcampId}`
                })

            }
       }

    } catch(error) {

            res.
            status(400).
            json({
                success: false,
                message: `no hay bootcamp con este id: ${bootcampId}`

            })
    }

    
});

//Crear un bootcamp
router.post('/', protect, async (req, res)=>{

    // El nuevo bootcamp vendra a traves del body de la request
    
    try{
        const newBootcamp = await bootcampModel.create(req.body)
        res.status(201).json({
            success: true,
            data: newBootcamp
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});

// Actualizar un bootcamp por id
router.put('/:id', async (req, res)=>{

    try{
        const bootcampId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(bootcampId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "identificador invalido"
            })
        }else{
            const updBootcamp = await bootcampModel.findByIdAndUpdate(bootcampId, req.body, { new : true })

            if(updBootcamp){
                res.
                status(200).json({
                    success: true,
                    data: updBootcamp
                })
            }else{
                res.status(400).json({
                    success: false,
                    message: `no hay bootcamp cuyo id es ${bootcampId}`
                })
            }
        }
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});


// eliminar un bootcamp por id
router.delete('/:id', async (req, res)=>{

    const bootcampId = req.params.id
    const delBootcamp = await BootcampModel.findByIdAndDelete(bootcampId)

    res.json({
        success: true,
        data: delBootcamp
    })
});


module.exports = router