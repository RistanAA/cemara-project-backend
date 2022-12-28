const express = require('express')
const router = express.Router()
const Joi = require('joi')
const ReportDA = require('../schemas/reportDA')

const reportDARequest = Joi.object({
    reportType: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    imageUrl: Joi.string().required(),
    animalCategory: Joi.string().required(),
    location: Joi.string().required(),
    community: Joi.allow(),
})


router.post('/report', async (req, res) => {
    try {
        const { reportType, phoneNumber, imageUrl, animalCategory, location, community } = await reportDARequest.validateAsync(req.body)
        await ReportDA.create({
            reportType,
            status: "requested",
            phoneNumber,
            imageUrl,
            animalCategory,
            location,
            community
        })
        res.status(201).send({
            statusCode: 201,
            message: "Report added"
        })

    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error.message
        })
    }
})


router.get('/report', async (req, res) => {
    try {
        const data = await ReportDA.find({}, {
            _id: 0, 
            id: "$_id", 
            reportType: 1, 
            status: 1, location: 1, 
            imageUrl: 1, 
            phoneNumber: 1, 
            postTime: "$createdAt"
        })
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