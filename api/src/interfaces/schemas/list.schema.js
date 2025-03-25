const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(50);
const nameList = Joi.string().min(3).max(50);

const createListSchema = Joi.object({
  name: name.required(),
});

const updateListSchema = Joi.object({
  listName: nameList.required(),
  newName: name.required(),
});

const deleteListSchema = Joi.object({
  listName: name.required(),
});


module.exports = { createListSchema, updateListSchema, deleteListSchema };
