const router = require('express').Router()
const generateApiKey  = require('generate-api-key')
const closeRoutes = require('../middlewares/closeRoutes.js')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const SessionModel = require('../models/session.js')

router.get('/success', closeRoutes, async (req, res) => {
    res.render('success', {
        title: 'Success',
        apiKey: generateApiKey({ method: 'string', min: 10, max: 20 }),
    })

})

module.exports = router;