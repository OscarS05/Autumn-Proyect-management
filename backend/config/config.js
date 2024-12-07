require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUrl: process.env.DATABASE_URL,
  frontUrl: process.env.URL_FRONT,
  jwtSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPass: process.env.SMTP_PASS
}

module.exports = { config };
