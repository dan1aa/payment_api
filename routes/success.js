const router = require('express').Router()
const generateApiKey  = require('generate-api-key')
const closeRoutes = require('../middlewares/closeRoutes.js')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const SessionModel = require('../models/session.js')

router.get('/success', closeRoutes, async (req, res) => {
    try {    
        const { session_id } = req.query;
        const currentSessionId = await SessionModel.findOne({ sessionId: req.session.user.sessionId, userId: req.session.user._id  })
        console.log(currentSessionId)
        if(!session_id) {
            if(!currentSessionId) {
                res.json({message: 'no session id'})
            }
        }
        if(currentSessionId) {
            res.render('success', {
                title: 'Success',
                apiKey: generateApiKey({ method: 'string', min: 15, max: 20 })
            })
        }
        else {
            res.json({message: 'Please, pay for api!'})
        }
    }
    catch(e) {
        throw new Error(e)
    }

})

module.exports = router;