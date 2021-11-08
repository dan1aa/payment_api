const { Schema, model } = require('mongoose')

const sessionSchema = new Schema({
    sessionId: String
})

module.exports = model('stripeSession', sessionSchema)