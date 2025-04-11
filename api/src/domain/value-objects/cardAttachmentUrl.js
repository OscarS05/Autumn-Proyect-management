const Boom = require('@hapi/boom');

class CardAttachmentUrl {
  constructor(url) {
    this._validate(url);
    this._url = url;
  }

  _validate(url) {
    const urlPattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    if (!url || typeof url !== 'string' || !urlPattern.test(url)) throw Boom.badData('Invalid card attachment URL');
  }

  get value() {
    return this._url;
  }

  toString() {
    return this._url;
  }
}

module.exports = CardAttachmentUrl;
