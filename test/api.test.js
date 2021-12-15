const chai = require('chai')
const assert = require('chai').assert
const axios = require('axios')
const apiKey = require('../models/apiKey')

const URL = 'http://localhost:3000'

const statusCodeTest = (reqPage, statusCode) => {
    axios.get(`${URL}/${reqPage}`)
        .then(res => {
            assert.equal(res.statusCode, statusCode)
        })
        .catch(err => {
            throw new Error(err)
        })
}

describe('Status codes tests', () => {
    it('Request to main page', done => {
        statusCodeTest('', 200)
        done()
    })
    it('Request to login page', done => {
        statusCodeTest('login', 200)
        done()
    })
    it('Request to register page', done => {
        statusCodeTest('register', 200)
        done()
    })
    it('Request to faq page', done => {
        statusCodeTest('faq', 200)
        done()
    })
    it('Request to invalid page', done => {
        statusCodeTest('invalidUrl', 404) 
        done()
    })
})