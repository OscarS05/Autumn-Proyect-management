const boom = require('@hapi/boom');

class ChecklistName {
  #value;

  constructor(value) {
    this._validate(value);
    this.#value = value;
  }

  _validate(value) {
    if (typeof value !== 'string' || value.trim() === '') {
      throw boom.badData('ChecklistName must be a non-empty string.');
    }

    if (value.length > 50) {
      throw boom.badData('ChecklistName cannot exceed 80 characters.');
    }
  }

  get value() {
    return this.#value;
  }

  toString() {
    return this.#value;
  }
}

module.exports = ChecklistName;
