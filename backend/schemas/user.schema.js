const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const name = Joi.string().min(3).max(50);
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  confirmPassword: Joi.object()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Las contraseñas no coinciden' }),
});




module.exports = { createUserSchema }
