const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')
const Error = require('../loggers/error')

let error = new Error()

router.get("/logout", closeRoutes, (req, res) => {
    try {
        req.session.isAuth = false;
        res.redirect('/')
    }
    catch(e) {
        error.error(res, e)
    }
});

module.exports = router;