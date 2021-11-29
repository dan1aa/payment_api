const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const Error = require('../loggers/error.logger.js')

let errorLogger = new Error()

router.get("/logout", closeRoutes, (req, res) => {
    try {
        req.session.isAuth = false;
        req.session.isUserPay = false;
        res.redirect('/')
    }
    catch(e) {
        errorLogger.serverError(res, e)
    }
});

module.exports = router;