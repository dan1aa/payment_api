const { Schema, model } = require('mongoose')

const sessionSchema = new Schema({
    sessionId: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = model('stripeSession', sessionSchema)