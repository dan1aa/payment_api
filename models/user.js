const {Schema, model} = require('mongoose')

const userModel = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String
    },
    isUserPay: {
        type: Boolean,
        default: false
    },
    payerId: {
        type: String,
        default: null
    },
    paymentId: {
        type: String,
        default: null
    },
    currentApiKey: {
        type: String,
        default: ''
    }
})

module.exports = model('User', userModel)