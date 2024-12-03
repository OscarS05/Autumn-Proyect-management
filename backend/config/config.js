require('dotenv');

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPass: process.env.SMTP_PASS
}

module.exports = { config };
