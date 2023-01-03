const mongoose = require('mongoose')

const reportDASchema = new mongoose.Schema({
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
    animalCategory: {
        type: String,
        required: true,
    },
    location: {
        type: Object,
        required: true,
    },
    community: {
        type: Array,
        required: true,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('ReportDA', reportDASchema)