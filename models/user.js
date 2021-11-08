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
    }
})

module.exports = model('User', userModel)