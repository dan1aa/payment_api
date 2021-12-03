const chai = require('chai')
const assert = require('chai').assert
const request = require('request')

const URL = 'http://localhost:3000'

describe('API tests', () => {
    describe('Main route', () => {
        it('Should return 200', done => {
            request(URL, (err, res, body) => {
                assert.equal(res.statusCode, 200)
                done()
            })
        })
    })
})