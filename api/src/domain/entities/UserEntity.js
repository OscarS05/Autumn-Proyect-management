const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');

const Email = require('../value-objects/email');
const Password = require('../value-objects/password');

class UserEntity {
  constructor({ name, email, password }) {
    this.id = uuidv4();
    this.name = name;
    this.email = new Email(email);
    this.password = new Password(password);
    this.recoveryToken = null;
    this.role = 'basic';

    this.validate();
  }

  validate() {
    if (!this.name || this.name.length < 3) {
      throw boom.badData('The name must contain at least 3 letters');
    }
  }
}

module.exports = UserEntity;
