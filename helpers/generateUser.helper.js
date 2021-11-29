
let user = {
    name: 'test',
    age: 25,
    sex: 'male',
    birthdayYear: 2006,
    email: 't@mail.com',
    country: 'Ukraine',
    address: {
        City: 'If',
        street: 'Gal',
        streetNumber: 12
    },
    work: {
        position: 'Programmer',
        experience: '1 year',
        company: 'Corporation inc.'
    },
    martialStatus: true,
}

function generateUser() {
    return user
}

module.exports = {
    generateUser
}