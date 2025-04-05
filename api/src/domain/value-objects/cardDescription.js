const boom = require('@hapi/boom');

class CardDescription {
  constructor(value) {
    this._ensureIsValid(value);
    this._value = value;
  }

  _ensureIsValid(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw boom.badData('CardDescription must be a non-empty string.');
    }
    if (value.length > 255) {
      throw boom.badData('CardDescription cannot exceed 255 characters.');
    }
  }

  get value() {
    return this._value;
  }

  toString() {
    return this._value;
  }
}

module.exports = CardDescription;
