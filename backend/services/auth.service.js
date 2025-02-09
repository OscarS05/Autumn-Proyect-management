const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const service = new UserService();

const RedisService = require('./redis.service');
const redisService = new RedisService();

const { config } = require('./../config/config');
const { use } = require('passport');


class AuthService {
  constructor() {}

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  async signToken(user){
    if(!user){
      throw boom.unauthorized();
    }

    const payload = {
      sub: user.dataValues?.id || user.id,
      role: user.dataValues?.role || user.role,
    };
    const accessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '15d' });

    const saveInRedis = await redisService.saveRefreshToken(payload.sub, refreshToken);

    return({ accessToken, refreshToken });
  }

  async validateTokens(accessToken, refreshToken){
    try {
      const decodedAccessToken = await this.validateAccessToken(accessToken);
      if(decodedAccessToken){
        return { status: 200, message: 'Token is valid', data: accessToken };
      }
    } catch (accessError) {
      if(accessError.name === 'TokenExpiredError'){
        try {
          const decodedRefreshToken = await this.validateRefreshToken(refreshToken);
          const isValidRefreshTokenInRedis = await redisService.verifyRefreshTokenInRedis(decodedRefreshToken.sub, refreshToken);

          if(!isValidRefreshTokenInRedis){
            throw boom.unauthorized();
          }

          await redisService.removeRefreshToken(decodedRefreshToken.sub, refreshToken);

          const user = {
            id: decodedRefreshToken.sub,
            role: decodedRefreshToken.role
          }

          const newTokens = await this.signToken(user);

          return { status: 200, data: newTokens, message: 'Token is valid' };
        } catch (refreshError) {
          return { status: 401, message: 'Invalid refresh token' };
        }
      } else {
        return { status: 401, message: 'Invalid access token' };
      }
    }
  }

  async logout(userId, refreshToken) {
    try {
      await this.removeRefreshToken(userId, refreshToken);
      return { status: 200, message: 'Logout successful' };
    } catch (error) {
      throw boom.internal('Error during logout');
    }
  }

  async sendEmailConfirmation(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.notFound('User not found');
    }
    const payload = { sub: user.id, rol: user.rol};
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `${config.frontUrl}/auth/verify-email/email-confirmed?token=${token}`
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Click on the link to confirm email",
      html: `<b>Click here: ${link}</b>`,
    }

    const send = await this.sendMail(mail);
    return { send };
  }

  async verifyEmailToActivateAccount(token){
    const user = await this.verifyEmail(token);
    if(user.recoveryToken !== token){
      throw boom.unauthorized();
    }
    if(user.isVerified){
      throw boom.badRequest('The user is already verified. Please, sign in!');
    }
    await service.update(user.id, { isVerified: true, recoveryToken: null});
    return user;
  }

  async verifyEmail(token){
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await service.findOne(payload.sub);
    if(!user){
      throw boom.notFound('Not found');
    }
    return user;
  }

  async changePassword(token, credentials){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      if(!payload){
        throw boom.unauthorized('The token is invalid or it has expired. Please try again!');
      }
      const user = await service.findOne(payload.sub);
      if(user.recoveryToken !== token){
        throw boom.unauthorized('You dont unauthorized. Please try again!');
      }

      const hash = await bcrypt.hash(credentials.newPassword, 10);
      await service.update(payload.sub, {recoveryToken: null, password: hash, isVerified: true});
      return { message: 'Password changed! Please, sign up.' };
    } catch (error) {
      throw boom.unauthorized('Sorry, something went wrong. Please try again!');
    }
  }

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465, //Secure port
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPass
      }
    });

    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async validateAccessToken(accessToken){
    const decodedAccessToken = jwt.verify(accessToken, config.jwtSecret);
    return decodedAccessToken;
  }

  async validateRefreshToken(refreshToken){
    const decodedRefreshToken = jwt.verify(refreshToken, config.jwtRefreshSecret);
    return decodedRefreshToken;
  }
}

module.exports = AuthService;
