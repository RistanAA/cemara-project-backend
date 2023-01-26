const express = require('express')
const router = express.Router()
const Joi = require('joi')
const ReportDA = require('../schemas/reportDA')
const ReportAR = require('../schemas/reportAR')
const authMiddleware = require('../middlewares/authMiddleware')

const reportDARequest = Joi.object({
    // reportType: Joi.string().required(),
    animalCategory: Joi.string().required(),
    imageUrl: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    location: Joi.allow(),
    communityList: Joi.allow(),
})



router.post('/report/da', async (req, res) => {
    try {
        const { animalCategory, imageUrl, communityList, phoneNumber, location } = await reportDARequest.validateAsync(req.body)
        await ReportDA.create({
            reportType: "DA",
            status: "requested",
            animalCategory,
            imageUrl,
            phoneNumber,
            location,
            communityList
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
        console.log(error);
    }
})

const reportARRequest = Joi.object({
    reportType: Joi.string().required(),
    animalType: Joi.string().required(),
    animalName: Joi.string().required(),
    imageUrl: Joi.string().required(),
    addInfo: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    province: Joi.string().required(),
    city: Joi.string().required(),
    communityList: Joi.allow(),

})

router.post('/report/ar', async (req, res) => {
    try {
        const { reportType, animalType, animalName, imageUrl, addInfo, name, email, phoneNumber, address, province, city, communityList } = await reportARRequest.validateAsync(req.body)
        await ReportAR.create({
            reportType: "AR",
            status: "requested",
            animalType,
            animalName,
            imageUrl,
            addInfo,
            name,
            email,
            phoneNumber,
            address,
            province,
            city,
            communityList
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
        console.log(error);
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
            let timeWIB = new Date(time.getTime())
            // let timeWIB = new Date(time.getTime() + 7 * 60 * 60 * 1000)
            // let timeWIB = new Date(time.getTime() + time.getTimezoneOffset()*60*1000)
            let now = new Date()
            // console.log(now);
            // console.log(now.getHours());
            // console.log(now.getHours() + ":" + now.getMinutes());
            // console.log(now.getHours() + 7);

            let differentDays = (now.getTime() - timeWIB.getTime()) / (1000 * 3600 * 24)
            let newTime = ""

            // console.log(differentDays);
            if (differentDays > 1 && differentDays < 2) {
                newTime = "Kemarin"
            } else if (differentDays > 2) {
                newTime = format(timeWIB)
            } else if (differentDays < 1) {
                newTime = timeWIB.getHours() + ":" + timeWIB.getMinutes()
            }
            // console.log(item)
            return newTime
        }
        const dataAR = await ReportAR.find({}, {
            _id: 1,
            id: "$_id",
            reportType: 1,
            status: 1,
            imageUrl: 1,
            animalName: 1,
            animalType: 1,
            information: "$addInfo",
            createdAt: 1,
            updatedAt: 1,
            address: 1,
            name: 1,
            email: 1,
            phoneNumber: 1,
        })
        dataAR.forEach(item => {
            let newData = item._doc
            newData.time = setNewTime(item.createdAt)
            data.push(newData)
        })
        const dataDA = await ReportDA.find({}, {
            _id: 0,
            id: "$_id",
            reportType: 1,
            status: 1, location: 1,
            imageUrl: 1,
            animalCategory: 1,
            phoneNumber: 1,
            postTime: "$createdAt",
            createdAt: 1,
            updatedAt: 1,
        })

        dataDA.forEach(item => {
            let newData = item._doc
            const { address, province, city } = newData.location
            newData.time = setNewTime(item.createdAt)
            newData.address = address
            newData.province = province
            newData.city = city
            data.push(newData)
        })


        // console.log(data)
        data.sort(function (a, b) {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
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

router.post('/report/update-status', async (req, res) => {
    try {
        const { id, type } = req.body

        let data = []

        if (type === "DA") {
            data = await ReportDA.findOne({ _id: id })
        } else if (type === "AR") {
            data = await ReportAR.findOne({ _id: id })
        }


        if (data.status === "requested") {
            data.status = "accepted"
        } else if (data.status === "accepted") {
            data.status = "finished"
        }

        await data.save()

        res.status(200).send({
            statusCode: 200,
            message: "Status updated successfully"
        })
    } catch (error) {
        res.status(400).send({
            statusCode: 400,
            message: error.message
        })
    }
})

// router.post('/delete/some', async (req, res) => {
//     try {
//         const { info } = req.body
//         const data = await ReportAR.deleteMany({ addInfo: info })
        
//         res.send({
//             data
//         })
//     } catch (error) {
//         res.status(400).send({
//             message: error.message
//         })
//     }
// })

module.exports = router;