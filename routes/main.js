const paymentDetails = require('../models/paymentDetails')
const router = require('express').Router()

router.get('/', async (req, res) => {
    let isUserPay = req.session.isUserPay;
    res.render('main', {
        title: 'Main',
        cssFileName: 'main',
        isUserPay
    })
    
})

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        cssFileName: 'register',
    })
})

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Log in',
        cssFileName: 'login',
    })
})


module.exports = router;