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
    .messages({ 'any.only': 'Passwords do not match' }),
});

const changePassword = Joi.object({
  newPassword: password.required(),
  confirmNewPassword: Joi.object()
    .valid(Joi.ref('newPassword'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
});


module.exports = { createUserSchema, changePassword }
