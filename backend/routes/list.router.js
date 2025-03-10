const express = require('express');
const passport = require('passport');

const { createListSchema, updateListSchema, deleteListSchema } = require('./../schemas/list.schema');
const ListService = require('./../services/db/list.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const service = new ListService();

const router = express.Router();

router.get('/:name', async (req, res, next) => {
  try {
    const { name } = req.params;
    const listId = await service.findByName(name);
    res.json(listId);
  } catch (error) {
    next(error);
  }
});

router.get('/',
  async (req, res, next) => {
    try {
      const lists = await service.findAll();;
      res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/create-list',
  validatorHandler(createListSchema, 'body'),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const listName = req.body;
      const newList = await service.create(listName);
      console.log('THIS IS NEWLIST', newList);
      res.status(201).json(newList);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/update-list',
  validatorHandler(updateListSchema, 'body'),
  async (req, res, next) => {
    try {
      const newName = req.body;
      const updatedList = await service.update(newName);
      res.status(200).json({updatedList});
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/delete-list',
  validatorHandler(deleteListSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const rta = await service.delete(data);
      res.status(200).json({rta});
    } catch (error) {
      next(error);
    }
});

module.exports = router;
