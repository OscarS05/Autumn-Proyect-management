const boom = require('@hapi/boom');

class Password {
  constructor(value) {
    if (!this.validate(value)) {
      throw new Error('The password must have at least 8 characters and contain at least one number');
    }
    this.value = value;
  }

  validate(password) {
    if (password.length < 8) {
      throw boom.badRequest('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      throw boom.badRequest('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      throw boom.badRequest('Password must contain at least one number');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      throw boom.badRequest('Password must contain at least one special character (!@#$%^&*)');
    }

    return password;
  }
}

module.exports = Password;
