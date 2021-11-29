const { Schema, model } = require('mongoose')

const apiKeySchema = new Schema({
    apiKey: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: { type: Date, expires: '1440m', default: Date.now }
})

module.exports = model('apikey', apiKeySchema)