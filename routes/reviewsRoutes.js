const express = require('express'); // Framework
const ReviewModel = require('../models/reviewModel');
const mongoose = require('mongoose')

// Definir el ruteador
const router = express.Router()

//REVIEWS
router.get('/', async (req, res)=>{
    try {
        const review = await  ReviewModel.find()

        if(review.length > 0) {
            res.status(200).json({
                success: true,
                data: review
            });
        } else {
            res.status(400).json({
            success: false,
            message: 'No hay reviews'
        });
        }
    
        
    } catch (error) {
        
    }
});

// Traer una review por id
router.get('/:id', async (req, res)=>{
    try {
        const reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "Id invalido"
            })
       }else{
            const review = await ReviewModel.findById(reviewId)

            if(review){
                res.status(200).json({
                    success: true,
                    data: review
                })
            }
            else{
                res.
                status(400).
                json({
                    success: false,
                    message: `no hay reviews cuyo id sea: ${reviewId}`
                })

            }
       }

    } catch(error) {

            res.
            status(400).
            json({
                success: false,
                message: `no hay reviews con este id: ${reviewId}`

            })
    }
});


//Crear una review
router.post('/', async (req, res)=>{
    try{
        const newReview = await ReviewModel.create(req.body)
        res.status(201).json({
            success: true,
            data: newReview
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});


// Actualizar una review por id
router.put('/:id', async (req, res)=>{
    try{
        const reviewId = req.params.id
        if(!mongoose.Types.ObjectId.isValid(reviewId)){
            res
            .status(500)
            .json({
              success: false,
              msg: "Id invalido"
            })
        }else{
            const updReview = await ReviewModel.findByIdAndUpdate(reviewId, req.body, { new : true })

            if(updReview){
                res.
                status(200).json({
                    success: true,
                    data: updReview
                })
            }else{
                res.status(400).json({
                    success: false,
                    message: `no hay reviews con el id ${reviewId}`
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

// eliminar una review por id
router.delete('/:id', async (req, res)=>{
    const reviewId = req.params.id
    const delReview = await ReviewModel.findByIdAndDelete(reviewId)

    res.json({
        success: true,
        data: delReview
    })
});

module.exports = router