const router = require('express').Router()
const { apiKey } = require('../helpers/generateApi')
const closeRoutes = require('../middlewares/closeRoutes')
const Error = require('../loggers/error')
const apikeySchema = require('../models/apiKey')

let error = new Error()

router.get('/apikey', closeRoutes, async (req, res) => {
    const { payerId, paymentId } = req.query
    try {
        if (req.session.isUserPay === false || payerId !== req.session.payerId || paymentId !== req.session.paymentId) { res.send({ message: 'Invalid url or query params' }) }
        else {
            const isApiKeyExist = await apikeySchema.findOne({ apiKey })
            if (!isApiKeyExist) {
                const newApiKey = new apikeySchema({
                    apiKey,
                    userId: req.session.user._id
                })
                await newApiKey.save()
                req.session.apiKey = apiKey;
                res.render('apikey', {
                    title: 'Api key',
                    apiKey
                })
            }
            else {
                res.render('apikey', {
                    title: 'Api key',
                    apiKey: req.session.apiKey
                })
            }
        }
    } catch (e) {
        error.error(res, e)
    }
})

module.exports = router;