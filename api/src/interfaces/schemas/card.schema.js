const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const description = Joi.string().max(255);
const newName = Joi.string().min(3).max(50);

const cardSchemas = Joi.object({
  listId: id.required(),
  cardId: id.required()
});

const createCardSchema = Joi.object({
  name: name.required(),
  description: description,
});

const updateCardSchema = Joi.object({
  newName: newName.required(),
  description: description,
});


module.exports = { cardSchemas, createCardSchema, updateCardSchema }
