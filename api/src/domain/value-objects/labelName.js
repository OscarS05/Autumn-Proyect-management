const boom = require('@hapi/boom');

class LabelName {
  #value;

  constructor(value) {
    this._validate(value);
    this.#value = value;
  }

  _validate(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw boom.badData('LabelName must be a non-empty string.');
    }

    if (value.length > 80) {
      throw boom.badData('LabelName cannot exceed 80 characters.');
    }
  }

  get value() {
    return this.#value;
  }

  toString() {
    return this.#value;
  }
}

module.exports = LabelName;
