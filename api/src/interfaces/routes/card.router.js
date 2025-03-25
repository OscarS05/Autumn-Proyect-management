// const express = require('express');

// const CardService = require('../../application/services/card.service');
// const { validatorHandler } = require('../middlewares/validator.handler');
// const { createCardSchema, updateCardSchema, deleteCardSchema } = require('../schemas/card.schema');

// const router = express.Router();
// const service = new CardService();

// router.get('/:listId', async (req, res, next) => {
//   try {
//     const { listId } = req.params;
//     const cards = await service.findByListId(listId);
//     res.json(cards);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:name', async (req, res, next) => {
//   try {
//     const { name } = req.params;
//     const cardId = await service.findByName(name);
//     res.json(cardId);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/', async (req, res, next) => {
//   try {
//     const cards = await service.findAll();
//     res.json(cards);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/create-card',
//   validatorHandler(createCardSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const rta = await service.create(body);
//       res.status(201).json(rta);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch('/update-card',
//   validatorHandler(updateCardSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const rta = await service.update(data);
//       res.status(200).json({rta});
//     } catch (error) {
//       next(error);
//     }
// });

// router.delete('/delete-card',
//   validatorHandler(deleteCardSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const data = req.body;
//       const rta = await service.delete(data);
//       res.status(200).json({rta});
//     } catch (error) {
//       next(error);
//     }
// });


// module.exports = router;
