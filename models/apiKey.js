const { Schema, model } = require('mongoose')

const apiKeySchema = new Schema({
    apiKey: String
})

module.exports = model('apikey', apiKeySchema)