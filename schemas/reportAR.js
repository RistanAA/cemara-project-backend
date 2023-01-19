const mongoose = require('mongoose')

const reportARSchema = new mongoose.Schema({
    reportType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    animalType: {
        type: String,
        required: true,
    },
    animalName: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    addInfo: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    communityList: {
        type: Array,
        required: true,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('ReportAR', reportARSchema)