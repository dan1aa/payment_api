const apiKey = require('../models/apiKey');
const router = require('express').Router()
const { generateUser } = require('../helpers/generateUser.helper.js')

router.get('/data', async (req, res) => {
    const { apikey } = req.query;

    let isApiKeyExist = await apiKey.findOne({apiKey: apikey})
    console.log(isApiKeyExist)
    if(!isApiKeyExist || !apikey) {
        res.render('notfound', {
            title: 'Not found',
            message: 'Invalid apikey or you forgot put apikey into query param like this: http://localhost:3000/data?apikey=<YOUR_APIKEY>'
        })
    }

    res.json(generateUser())
})


module.exports = router;