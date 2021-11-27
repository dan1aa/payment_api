const router = require('express').Router()
const paypal = require('paypal-rest-sdk')
const closeRoutes = require('../middlewares/closeRoutes')
const Error = require('../loggers/error')

let error = new Error()

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
        if (e) error.error(res, e)
        for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
                res.redirect(payment.links[i].href)
            }
        }
        console.log(payment)
    });
})

router.get('/success', closeRoutes, (req, res) => {
    try {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        req.session.paymentId = paymentId;
        req.session.payerId = payerId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "1.00"
                }
            }]
        }
        paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
                req.session.isUserPay = true
                res.redirect('/')
        });
    }
    catch (e) {
        error.error(res, e)
    }
})

router.get('/cancel', (req, res) => {
    res.send('canceled')
})

module.exports = router;