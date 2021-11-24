const router = require('express').Router()
const closeRoutes = require('../middlewares/closeRoutes')

router.get("/logout", closeRoutes, (req, res) => {
    try {
        req.session.isAuth = false;
        res.redirect('/')
    }
    catch(e) {
        throw new Error(e)
    }
});

module.exports = router;