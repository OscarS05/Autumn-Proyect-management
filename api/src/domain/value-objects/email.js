class Email {
  constructor(value) {
    if (!this.validate(value)) {
      throw new Error('The email is not valid');
    }
    this.value = value;
  }

  validate(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

module.exports = Email;
