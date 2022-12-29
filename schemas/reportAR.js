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
    phoneNumber: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    animalName: {
        type: String,
        required: true,
    },
    location: {
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
},
    {
        timestamps: true
    });

module.exports = mongoose.model('ReportAR', reportARSchema)