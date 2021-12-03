const randomValuesFromArray = array => {
    return array[Math.floor(Math.random() * array.length)]
}

const randomDate = () => {
    const date =  new Date(new Date(1950, 0, 1).getTime() + Math.random() * (new Date(2017, 0, 1).getTime() - new Date(1950, 0, 1).getTime()))
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;

    return `${day}/${month}`
}

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomPhoneNumber = () => {
    return `+${randomNumber(0, 9)}-${randomNumber(10, 99)}-${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`
}

const randomPassword = () => {
    return Math.random().toString(36).slice(-8)
}

module.exports = {
    randomDate,
    randomValuesFromArray,
    randomNumber,
    randomPhoneNumber,
    randomPassword
}