const Joi = require('joi')

const loginSchema = Joi.object({
    username: Joi.string()
    .min(3)
    .max(15)
    .required(),
    password: Joi.string()
    .min(8)
    .max(100)
    .required()
})

module.exports = loginSchema;