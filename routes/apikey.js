const router = require('express').Router()
const { apiKey } = require('../helpers/generateapi.helper.js')
const closeRoutes = require('../middlewares/closeRoutes')
const Error = require('../loggers/error.logger.js')
const apikeySchema = require('../models/apiKey')
const User = require('../models/user.js')

let errorLogger = new Error()

router.get('/apikey', closeRoutes, async (req, res) => {
    const { payerId, paymentId } = req.query
    const currentUser = await User.findOne({ name: req.session.user.name })

    try {
        if (currentUser.isUserPay === false || payerId !== currentUser.payerId || paymentId !== currentUser.paymentId) {
            res.render('notfound', { message: 'Invalid url or query params' })
        }
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
                apiKey,
                isUserPay: currentUser.isUserPay
            })
        }
        else {
            res.render('apikey', {
                title: 'Api key',
                apiKey: req.session.apiKey,
                isUserPay: currentUser.isUserPay
            })
        }
    } catch (e) {
        errorLogger.serverError(res, e)
    }
})

module.exports = router;