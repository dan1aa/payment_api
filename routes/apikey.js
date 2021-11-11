const router = require('express').Router()
const generateApiKey  = require('generate-api-key')
const closeRoutes = require('../middlewares/closeRoutes.js')
const SessionModel = require('../models/session.js')

router.get('/apikey', closeRoutes, async (req, res) => {
    try {    
        const { incompleteSessionId } = req.session;
        req.session.user.sessionId = incompleteSessionId
        const newSession = new SessionModel({
            sessionId: incompleteSessionId,
            userId: req.session.user._id
        })
        await newSession.save()
        const currentSessionId = await SessionModel.findOne({ sessionId: req.session.user.sessionId, userId: req.session.user._id })
        if(currentSessionId) {
            res.render('success', {
                title: 'Success',
                apiKey: generateApiKey({ method: 'string', min: 15, max: 20 })
            })
        }
        else {
            res.render('error', {message: 'Sorry, but you didn`t pay yet'})
        }
    }
    catch(e) {
        throw new Error(e)
    }

})

module.exports = router;