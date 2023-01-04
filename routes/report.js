const express = require('express')
const router = express.Router()
const Joi = require('joi')
const ReportDA = require('../schemas/reportDA')
const ReportAR = require('../schemas/reportAR')

const reportDARequest = Joi.object({
    reportType: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    imageUrl: Joi.string().required(),
    animalCategory: Joi.string().required(),
    location: Joi.object().required(),
    community: Joi.allow(),
})



router.post('/report/da', async (req, res) => {
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

const reportARRequest = Joi.object({
    reportType: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    imageUrl: Joi.string().required(),
    animalName: Joi.string().required(),
    location: Joi.object().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),

})

router.post('/report/ar', async (req, res) => {
    try {
        const { reportType, phoneNumber, imageUrl, animalName, location, name, email } = await reportARRequest.validateAsync(req.body)
        await ReportAR.create({
            reportType,
            status: "requested",
            phoneNumber,
            imageUrl,
            animalName,
            location,
            name,
            email
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
        let data = []
        const dataAR = await ReportAR.find({}, {
            _id: 0,
            id: "$_id",
            reportType: 1,
            status: 1, location: 1,
            imageUrl: 1,
            animalName: 1,
            postTime: "$createdAt",
            createdAt:1
        })
        dataAR.forEach(item => {
            data.push(item)
        })
        const dataDA = await ReportDA.find({}, {
            _id: 0,
            id: "$_id",
            reportType: 1,
            status: 1, location: 1,
            imageUrl: 1,
            phoneNumber: 1,
            postTime: "$createdAt",
            createdAt:1
        })

        dataDA.forEach(item => {
            data.push(item)
        })


        // console.log(data)
        data.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // console.log(sorted);
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