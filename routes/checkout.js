const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const SessionModel = require('../models/session.js')

router.post('/checkout', async (req, res) => {

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1Jt6t5BEvZZNNH4CUOn2VnIr',
                quantity: 1
            }
        ],
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000'
    })
    const newSession = new SessionModel({
        sessionId: session.id
    })
    await newSession.save()
    res.redirect(session.url)
})
  
module.exports = router;

