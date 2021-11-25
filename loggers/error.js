module.exports = class Error {
    error(res, e) {
        res.status(500).send({
            error: e,
            stack: e.stack
        })
    }
}