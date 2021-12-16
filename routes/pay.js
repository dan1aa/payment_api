const router = require('express').Router()
const paypal = require('paypal-rest-sdk')
const closeRoutes = require('../middlewares/closeRoutes')
const Error = require('../loggers/error.logger.js')
const User = require('../models/user')

let errorLogger = new Error()

router.post('/pay', closeRoutes, (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Api key",
                    "sku": "001",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "Api key"
        }]
    };

    paypal.payment.create(create_payment_json, function (e, payment) {
        try {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href)
                }
            }
        }
        catch(e) {
            errorLogger.serverError(res, e)
        }
    });
})

router.get('/success', closeRoutes, async (req, res) => {

    const currentUser = await User.findOne({ name: req.session.user.name })

    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const updatedPaymentUser = await User.findOneAndUpdate({ name: req.session.user.name }, { payerId, paymentId })
        await updatedPaymentUser.save()

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        }
        paypal.payment.execute(paymentId, execute_payment_json, async (e, payment) => {
                try {
                    const updatedPaymentUser = await User.findOneAndUpdate({ name: req.session.user.name }, { isUserPay: true })
                    await updatedPaymentUser.save()
                    res.redirect('/')
                }
                catch(e) {
                    errorLogger.serverError(res, e)
                }
        });
    }
    catch (e) {
        errorLogger.serverError(res, e)
    }
})

router.get('/cancel', (req, res) => {
    res.send('canceled')
})

module.exports = router;