const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const apikeySchema = require('../models/apiKey')
const Error = require('../loggers/error.logger.js')

let errorLogger = new Error()

router.get('/', async (req, res) => {
    try {
        res.render('main', {
            title: 'Main',
            cssFileName: 'main',
            payerId: req.session.payerId,
            paymentId: req.session.paymentId
        })
    }
    catch(e) {
        errorLogger.serverError(res, e)
    }
})



module.exports = router;