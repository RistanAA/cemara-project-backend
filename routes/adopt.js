const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Adopt = require('../schemas/adopt')
// const { count } = require('../schemas/reportDA')

const adoptRequest = Joi.object({
    name: Joi.string().required(),
    race: Joi.string().required(),
    sex: Joi.string().required(),
    age: Joi.number().required(),
    information: Joi.string().required(),
    imageUrl: Joi.string().required(),
    ownerName: Joi.string().required(),
    ownerAddress: Joi.string().required(),
    ownerPhoneNumber: Joi.string().required(),
})

router.post('/adopt', async (req, res) => {
    try {
        const data = await adoptRequest.validateAsync(req.body)

        await Adopt.create(data)

        res.status(201).send({
            statusCode: 201,
            message: "Adopt created"
        })

    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error.message
        })
    }
})

router.get('/adopt', async (req, res) => {
    try {
        const data = await Adopt.find({}, {
            id: '$_id',
            _id: 0,
            name: 1,
            race: 1,
            age: 1,
            sex: 1,
            information: 1,
            imageUrl:1

        }).sort({ 'createdAt': -1 })
        res.status(200).send({
            statusCode: 200,
            message: "Ok",
            total: data.length,
            data
        })
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error.message
        })
    }
})

router.get('/adopt/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await Adopt.findOne({_id: id}, {
            id: '$_id',
            _id: 0,
            name: 1,
            race: 1,
            age: 1,
            sex: 1,
            information: 1,
            imageUrl:1

        }).sort({ 'createdAt': -1 })
        
        res.status(200).send({
            statusCode: 200,
            message: "Ok",
            data
        })
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error.message
        })
    }
})

module.exports = router;