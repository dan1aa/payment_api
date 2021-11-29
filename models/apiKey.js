const { Schema, model } = require('mongoose')

const apiKeySchema = new Schema({
    apiKey: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
})

module.exports = model('apikey', apiKeySchema)