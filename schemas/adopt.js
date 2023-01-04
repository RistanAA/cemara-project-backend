const mongoose = require('mongoose')

const adoptSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    race: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    information: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
        required: true,
    },
    ownerPhoneNumber: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true
    });

module.exports = mongoose.model('Adopt', adoptSchema)