const uuidAPIKey = require('uuid-apikey')

const apiKey = uuidAPIKey.create().apiKey

module.exports = {
    apiKey
}