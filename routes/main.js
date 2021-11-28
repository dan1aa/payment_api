const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const apikeySchema = require('../models/apiKey')
const Error = require('../loggers/error')

let error = new Error()

router.get('/', async (req, res) => {
    res.render('main', {
        title: 'Main',
        cssFileName: 'main',
        payerId: req.session.payerId,
        paymentId: req.session.paymentId
    })
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        cssFileName: 'register'
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Log in',
        cssFileName: 'login',
    })
})



module.exports = router;