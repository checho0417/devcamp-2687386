const express = require('express'); // Framework
const CourseModel = require('../models/courseModel');
const courseModel = require('../models/courseModel')
const mongoose = require('mongoose')

// Definir el ruteador
const router = express.Router()

// CURSOS
router.get('/', async (req, res)=>{

    try {
        const courses = await CourseModel.find()

        if(courses.length > 0) {
            res.status(200).json({
                success: true,
                data: courses
            });
        } else {
            res.status(400).json({
                success: false,
                message: "No hay cursos para mostrar"
            });
        }

    } catch(error) {

    }

    
});

// Traer un curso por id
router.get('/:id', async (req, res)=>{

    try{
        const courseId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            res.status(500).json({
                success: false,
                msg: "Id de curso invalido"
            })
        }else {
            const course = await CourseModel.findById(courseId)

            if(course) {
               res.status(200).json({
                    success: true,
                    data: course
                });
            }else {
                res.status(400).json({
                    success: false,
                    message: `No hay curso cuyo id es ${courseId}`
                })
            }
        }
    } catch(error) {
        res.status(400).json({
            success: false,
            message: `no hay curso con este id: ${courseId}`
            })
    }

    
});


//Crear un curso
router.post('/', async (req, res)=>{

    try {
        const newCourse = await CourseModel.create(req.body)
        res.status(201).json({
            success: true,
            data: newCourse
        })
    }catch(error)  {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});


// Actualizar un cursos por id
router.put('/:id', async (req, res)=>{

    try{
        const courseId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(courseId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "Id invalido"
            })
        }else{
            const updCourse = await CourseModel.findByIdAndUpdate(courseId, req.body, { new : true })

            if(updCourse){
                res.
                status(200).json({
                    success: true,
                    data: updCourse
                })
            }else{
                res.status(400).json({
                    success: false,
                    message: `no hay curso con el id ${courseId}`
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

// eliminar un cursos por id
router.delete('/:id', async (req, res)=>{
    const courseId = req.params.id
    const delCourse = await CourseModel.findByIdAndDelete(courseId)

    res.json({
        success: true,
        data: delCourse
    })
});

module.exports = router