const router = require('express').Router()
const Error = require('../loggers/error.logger.js')

let errorLogger = new Error()

router.get('/faq', async (req, res) => {
   try {
        res.render('faq', {
            title: 'Faq',
            cssFileName: 'faq'
        })
   }
   catch(e) {
        errorLogger.serverError(res, e)
   }
})

module.exports = router;