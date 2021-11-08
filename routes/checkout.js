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
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000'
    })
    const newSession = new SessionModel({
        sessionId: session.id,
        userId: req.session.user._id
    })
    await newSession.save()
    res.redirect(session.url)
})
  
module.exports = router;

