module.exports = function(req, res, next) {
    res.locals.isUserPay = req.session.isUserPay;
    next()
}