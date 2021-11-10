const router = require('express').Router()
const SessionModel = require('../models/session')

router.get('/', async (req, res) => {
    const { sessionId } = req.session.user;
    const isSessionId = await SessionModel.findOne({ sessionId })
    let isUserPay = isSessionId === null ? null : true;
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