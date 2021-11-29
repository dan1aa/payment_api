module.exports = class Error {
    serverError(res, e) {
        res.status(500).send({
            error: e,
            stack: e.stack
        })
    }

    databaseConnectionError(e) {
        throw new Error(e)
    }
}