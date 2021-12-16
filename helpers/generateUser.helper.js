const names = require('../apiData/usernames')[0]
const emails = require('../apiData/emails')[0]
const countries = require('../apiData/countries')[0]
const works = require('../apiData/works')[0]
const universities = require('../apiData/universities')[0]
const { randomDate, randomValuesFromArray, randomNumber, randomPhoneNumber, randomPassword } = require('./generateValues.helper.js')


let generateUser = () => {
    return {
        name: randomValuesFromArray(names),
        age: randomNumber(18, 110),
        sex: randomValuesFromArray(['Male', 'Female']),
        birthday: randomDate(),
        email: randomValuesFromArray(emails),
        password: randomPassword(),
        phone: randomPhoneNumber(),
        country: randomValuesFromArray(countries),
        university: randomValuesFromArray(universities),
        work: {
            position: randomValuesFromArray(works),
        },
        married: randomValuesFromArray([true, false]),
        login: randomValuesFromArray(names),
        postCode:  randomNumber(10001, 99998),
        avatarUrl: 'https://picsum.photos/200/300'
    }
}

module.exports = {
    generateUser
}