const boom = require('@hapi/boom');
const { rateLimit } = require('express-rate-limit');

const { config } = require('./../config/config');

const limiter = (limit, windowMs) => rateLimit( {
  windowMs: windowMs, // 15 minutes = 15 * 60 * 1000
  limit: limit,
  message: 'Too many email requests, please try again after an 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { limiter };
