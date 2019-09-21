const mongoose = require('mongoose');
const {Schema} = mongoose;
const Helper = require('../helpers/helper')

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer