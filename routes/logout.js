const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get("/logout", (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
    catch(e) {
        throw new Error(e)
    }
});

module.exports = router;