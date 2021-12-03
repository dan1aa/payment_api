const Joi = require('joi')

const signupSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required(),
    password: Joi.string()
    .min(8)
    .max(100)
    .required(),
    email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
})

module.exports = signupSchema;