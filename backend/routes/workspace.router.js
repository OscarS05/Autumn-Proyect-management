const express = require('express');

// // const CardService = require('./../services/card.service');
// const { validatorHandler } = require('./../middlewares/validator.handler');
// // const { createCardSchema, updateCardSchema, deleteCardSchema } = require('./../schemas/card.schema');

// const validateSession = require('./../middlewares/auth.handler');

// const Auth = require('./../services/auth.service');
// const authService = new Auth();

const router = express.Router();
// // const service = new CardService();

// router.get('/:listId', async (req, res, next) => {
//   try {
//     const { listId } = req.params;
//     const cards = await service.findByListId(listId);
//     res.json(cards);
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

// router.post('/create-workspace',
//   validatorHandler(schemaForCreatingWorkspace, 'body'),
//   async (req, res, next) => {
//     const accessToken = req.headers.authorization?.split(' ')[1];
//     const refreshToken = req.cookies.refreshToken;
//     const isValidateSession = await authService.validateSession(accessToken, refreshToken);

//   }
// )

module.exports = router;
