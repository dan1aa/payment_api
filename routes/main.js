const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const {apiKey} = require('../helpers/generateApi')
const apikeySchema = require('../models/apiKey')

router.get('/', async (req, res) => {
    res.render('main', {
        title: 'Main',
        cssFileName: 'main'
    })
    console.log(req.session.isUserPay)
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

router.get('/apikey', closeRoutes,  async (req, res) => {
    if(req.session.isUserPay === false) {res.send({userPay: req.session.isUserPay})}
    else {
        const isApiKeyExist = await apikeySchema.findOne({ apiKey })
        console.log(isApiKeyExist)
        if(!isApiKeyExist) {
            const newApiKey = new apikeySchema({
                apiKey,
                userId: req.session.user._id
            })
            await newApiKey.save()
            req.session.apiKey = apiKey;
            res.render('apikey', {
                title: 'Api key',
                apiKey
            })
        }
        else {
            res.render('apikey', {
                title: 'Api key',
                apiKey: req.session.apiKey
            })
        }
    }
})


module.exports = router;