const boom = require("@hapi/boom");

class IStorageRepository {
  async upload(file) {
    throw boom.notImplemented('upload(file) Method not implemented');
  }

  async destroy(publicId) {
    throw boom.notImplemented('destroy(publicId) Method not implemented');
  }

  async get(publicId) {
    throw boom.notImplemented('get(publicId) Method not implemented');
  }
}

module.exports = IStorageRepository;
