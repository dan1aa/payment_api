const genereateApi = require('generate-api-key')

const generateApiKey = () => generateApiKey({ method: 'string', min: 15, max: 20 })

module.exports = {
    generateApiKey
}