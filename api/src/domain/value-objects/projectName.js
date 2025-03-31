const boom = require('@hapi/boom');

class ProjectName {
  constructor(value) {
    if (!value || typeof value !== 'string') {
      throw boom.badData('ProjectName must be a non-empty string.');
    }

    const trimmedValue = value.trim();
    if (trimmedValue.length < 3 || trimmedValue.length > 50) {
      throw boom.badData('ProjectName must be between 3 and 50 characters.');
    }

    this.value = trimmedValue;
  }

  getValue() {
    return this.value;
  }

  equals(other) {
    if (!(other instanceof ProjectName)) {
      return false;
    }
    return this.value === other.value;
  }
}

module.exports = ProjectName;
