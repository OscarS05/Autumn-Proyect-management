const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { config } = require('../../config/config');


class AuthService {
  constructor(sequelize, models, userService, redisModels) {
    this.sequelize = sequelize;
    this.models = models;
    this.userService = userService;
    this.redisModels = redisModels;
  }

  async getUser(email, password){
    const user = await this.userService.findByEmail(email);
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
      sub: user.dataValues?.id || user.id || user.sub,
      role: user.dataValues?.role || user.role,
    };
    const accessToken = jwt.sign(payload, config.jwtAccessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, { expiresIn: '15d' });

    await this.redisModels.AuthRedis.saveRefreshToken(payload.sub, refreshToken);

    return({ accessToken, refreshToken });
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
    const user = await this.userService.findByEmail(email);
    if(!user){
      throw boom.notFound('User not found');
    }
    const payload = { sub: user.id, rol: user.role};
    const token = jwt.sign(payload, config.jwtSecretVerifyEmail, { expiresIn: '15min' });
    const link = `${config.frontUrl}/auth/verify-email/email-confirmed?token=${token}`
    await this.userService.update(user.id, {recoveryToken: token});
    await this.redisModels.AuthRedis.saveTokenInRedis(user.id, token);
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Click on the link to confirm email",
      html: `<b>Click here: ${link}</b>`,
    }

    const send = await this.sendMail(mail);
    return { send, token };
  }

  async verifyEmailToActivateAccount(token){
    const user = await this.verifyEmail(token);
    const tokenInRedis = await this.redisModels.AuthRedis.verifyTokenInRedis(user.id, token);

    if(tokenInRedis !== token){
      throw boom.unauthorized();
    }
    if(user.isVerified){
      throw boom.badRequest('The user is already verified. Please, sign in!');
    }
    await this.userService.update(user.id, { isVerified: true, recoveryToken: null});
    return user;
  }

  async verifyEmail(token){
    const payload = jwt.verify(token, config.jwtSecretVerifyEmail);
    const user = await this.userService.findOne(payload.sub);
    if(!user){
      throw boom.notFound('Not found');
    }
    return user;
  }

  async changePassword(token, credentials){
    try {
      const payload = jwt.verify(token, config.jwtSecretVerifyEmail);
      if(!payload){
        throw boom.unauthorized();
      }

      const tokenInRedis = await this.redisModels.AuthRedis.verifyTokenInRedis(payload.sub, token);

      if(tokenInRedis !== token) throw boom.unauthorized();

      const hash = await bcrypt.hash(credentials.newPassword, 10);
      await this.userService.update(payload.sub, {recoveryToken: null, password: hash, isVerified: true});

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

  async verifyTokensToVerifyEmail(token){
    try {
      const decodedToken = jwt.verify(token, config.jwtSecretVerifyEmail);
      const tokenInRedis = await this.redisModels.AuthRedis.verifyTokenInRedis(decodedToken.sub, token);

      if(!tokenInRedis || tokenInRedis !== token){
        throw boom.unauthorized();
      }

      return true;
    } catch (error) {
      return res.status(500).json({ message: 'Invalid token' });
    }
  }

  async validateAccessToken(accessToken){
    const decodedAccessToken = jwt.verify(accessToken, config.jwtAccessSecret);
    return decodedAccessToken;
  }

  async validateRefreshToken(refreshToken){
    const decodedRefreshToken = jwt.verify(refreshToken, config.jwtRefreshSecret);
    return decodedRefreshToken;
  }
}

module.exports = AuthService;
