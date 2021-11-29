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
        console.log(req.session)
    }
    catch(e) {
        errorLogger.serverError(res, e)
    }
})

router.get('/register', (req, res) => {
    try {
        res.render('register', {
            title: 'Register',
            cssFileName: 'register'
        })
    }
    catch(e) {
        errorLogger.serverError(res, e)
    }
})

router.get('/login', (req, res) => {
    try {
        res.render('login', {
            title: 'Log in',
            cssFileName: 'login',
        })
    }
    catch(e) {
        error.serverError(res, e)
    }
})



module.exports = router;