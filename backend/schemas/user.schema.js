const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const fullName = Joi.string().min(3).max(50);
const password = Joi.string().min(8);
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  email: email.required(),
  fullName: fullName.required(),
  password: password.required(),
  confirmPassword: Joi.object()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Las contraseñas no coinciden' }),
  role: role.required()
});


module.exports = { createUserSchema }
