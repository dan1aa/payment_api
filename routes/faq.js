const router = require('express').Router()

router.get('/faq', async (req, res) => {
    res.render('faq', {
        title: 'Faq',
        cssFileName: 'faq'
    })
})

module.exports = router;