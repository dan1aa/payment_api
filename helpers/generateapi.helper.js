const generateApiKey = require('generate-api-key')

const apiKey = generateApiKey({ method: 'string', min: 10, max: 20 });

module.exports = {
    apiKey
}