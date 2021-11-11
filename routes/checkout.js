const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const closeRoutes = require('../middlewares/closeRoutes.js')
const SessionModel = require('../models/session.js')

router.post('/checkout', closeRoutes, async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price: process.env.STRIPE_PRICE,
                quantity: 1
            }
        ],
        success_url: `http://localhost:3000/apikey`,
        cancel_url: 'http://localhost:3000'
    })
    req.session.incompleteSessionId = session.id;
    res.redirect(session.url)
})
  
module.exports = router;

