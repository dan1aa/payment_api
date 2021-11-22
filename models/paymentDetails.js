const {Schema, model} = require('mongoose')

const paymentdetailsModel = new Schema({
    payerId: {
        type: String, 
        required: true
    },
    paymentId: {
        type: String, 
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('paymentDetails', paymentdetailsModel)