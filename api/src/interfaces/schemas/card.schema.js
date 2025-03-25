const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const newName = Joi.string().min(3).max(50);
const listId = Joi.number().integer();

const createCardSchema = Joi.object({
  cardName: name.required(),
  listId: listId.required(),
});

const updateCardSchema = Joi.object({
  cardName: name.required(),
  newName: newName.required(),
  listId: listId.required(),
});

const deleteCardSchema = Joi.object({
  cardName: name.required(),
  listId: listId.required(),
});


module.exports = { createCardSchema, updateCardSchema, deleteCardSchema }
