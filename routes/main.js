const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/', (req, res) => {
    res.render('main', {
        title: 'Main',
        cssFileName: 'main'
    })
})

router.get('/api', (req, res) => {
    res.send({data: 'api data'})
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
        cssFileName: 'login'
    })
})

module.exports = router;