const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const {apiKey} = require('../helpers/generateApi')

router.get('/', async (req, res) => {
    res.render('main', {
        title: 'Main',
        cssFileName: 'main'
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

router.get('/apikey', closeRoutes,  (req, res) => {
    res.render('apikey', {
        title: 'Api key',
        apiKey
    })
})


module.exports = router;