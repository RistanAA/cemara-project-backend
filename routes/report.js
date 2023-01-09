const express = require('express')
const router = express.Router()
const Joi = require('joi')
const ReportDA = require('../schemas/reportDA')
const ReportAR = require('../schemas/reportAR')
const authMiddleware = require('../middlewares/authMiddleware')

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

        const format = (inputDate) => {
            let date, month, year;
          
            date = inputDate.getDate();
            month = inputDate.getMonth() + 1;
            year = inputDate.getFullYear();
          
              date = date
                  .toString()
                  .padStart(2, '0');
          
              month = month
                  .toString()
                  .padStart(2, '0');
          
            return `${date}/${month}/${year}`;
          }

        const setNewTime = (itemTime) => {
            // console.log(itemTime);
            let time = new Date(itemTime)
            let now = new Date()
            // console.log(now);

            let differentDays = (now.getTime() - time.getTime()) / (1000 * 3600 * 24)
            let newTime = ""

            console.log(differentDays);
            if (differentDays === 1) {
                newTime = "Yesterday"
            } else if (differentDays > 1) {
                newTime = format(time)
            } else {
                newTime = time.getHours() + ":" + time.getMinutes()
            }
            // console.log(item)
            return newTime
        }
        const dataAR = await ReportAR.find({}, {
            _id: 1,
            id: "$_id",
            reportType: 1,
            status: 1, location: 1,
            imageUrl: 1,
            animalName: 1,
            postTime: "$createdAt",
            createdAt: 1
        })
        dataAR.forEach(item => {

            // let conditions = { _id: item._id, postTime : "123"};
            // let update = { postTime: setNewTime(item.createdAt) };

            // ReportAR.findOneAndUpdate(conditions, update, function (err) {
            //     if (err) {
            //         res.json('nope');
            //     }
            //     else {
            //         item = setNewTime(item.createdAt)
            //     }
            // })
            
            // item.save()
            // console.log(setNewTime(item.createdAt));
            // console.log(item._doc)
            let newData = item._doc
            newData.time = setNewTime(item.createdAt)
            data.push(newData)
            // data.push({...item, time : setNewTime(item.createdAt)})
        })
        const dataDA = await ReportDA.find({}, {
            _id: 0,
            id: "$_id",
            reportType: 1,
            status: 1, location: 1,
            imageUrl: 1,
            phoneNumber: 1,
            postTime: "$createdAt",
            createdAt: 1
        })

        dataDA.forEach(item => {
            // console.log(item._doc)
            let newData = item._doc
            newData.time = setNewTime(item.createdAt)
            data.push(newData)
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