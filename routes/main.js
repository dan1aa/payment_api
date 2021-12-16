const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const apikeySchema = require('../models/apiKey')
const Error = require('../loggers/error.logger.js')
const User = require('../models/user')

let errorLogger = new Error()

router.get('/', async (req, res) => {
    if(req.session.user) {
        var currentUser = await User.findOne({ name: req.session.user.name })
    }

    try {
        res.render('main', {
            title: 'Main',
            cssFileName: 'main',
            payerId: currentUser?.payerId || null,
            paymentId: currentUser?.paymentId || null,
            isUserPay: currentUser?.isUserPay
        })
    }
    catch(e) {
        errorLogger.serverError(res, e)
    }
})



module.exports = router;