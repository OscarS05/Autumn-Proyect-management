const { v2: cloudinary } = require('cloudinary');
const { config } = require('../../../../config/config');
const logger = require('../../../../utils/logger/logger');

cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

cloudinary.api.ping((error, result) => {
  if (error) {
    logger.error('❌ Error connecting to Cloudinary:', error);
  } else {
    if (config.isProd) {
      logger.info('Cloudinary successfully connected');
    } else {
      console.log('Connection to Cloudinary established: status:', result.status);
    }
  }
});

module.exports = cloudinary;
