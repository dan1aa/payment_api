const apiKey = require('../models/apiKey');
const router = require('express').Router()

router.get('/data', async (req, res) => {
    const { apikey } = req.query;
    
    let isApiKeyExist = await apiKey.findOne({apiKey: apikey})
    if(!isApiKeyExist || !apikey) {
        res.render('notfound', {
            title: 'Not found',
            message: 'Invalid apikey or you forgot put apikey into query param like this: http://localhost:3000/data?apikey=<YOUR_APIKEY>'
        })
    }
    else {
        res.json({
            data: {
                message: 'test'
            }
        })
    }
})

module.exports = router;