const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('main', {
        title: 'Main',
        cssFileName: 'main',
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