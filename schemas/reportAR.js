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
    animalGroup: {
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
    reporterName: {
        type: String,
        required: true,
    },
    reporterName: {
        type: String,
        required: true,
    },
    reporterEmail: {
        type: String,
        required: true,
    },
    reporterPhone: {
        type: String,
        required: true,
    },
    reporterAddress: {
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
    community: {
        type: Array,
        required: true,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('ReportAR', reportARSchema)