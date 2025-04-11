const boom = require("@hapi/boom");
const IStorageRepository = require('../../../domain/repositories/storage/IStorageRepository');

class CloudinaryStorageRepository extends IStorageRepository {
  constructor(cloudinary){
    super();
    this.cloudinary = cloudinary;
  }

  async upload(file, folder) {
    return await this.cloudinary.uploader.upload(file.path, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
    });
  }

  async destroy(publicId) {
    return this.cloudinary.uploader.destroy(publicId);
  }

  async getMetadata(publicId, folder) {
    const fullId = folder ? `${folder}/${publicId}` : publicId;
    return await this.cloudinary.api.resource(fullId, { resource_type: 'auto' });
  }

  async getUrl(publicId, folder) {
    const fullId = folder ? `${folder}/${publicId}` : publicId;
    return await this.cloudinary.url(fullId, { secure: true, resource_type: 'auto' });
  }
}

module.exports = CloudinaryStorageRepository;
