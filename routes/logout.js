const router = require('express').Router()

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