const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const service = new UserService();
const { config } = require('./../config/config');


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

  signToken(user){
    if(!user){
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
      role: user.role
    };
    const accessToken = jwt.sign(payload, config.jwtSecret);
    return({ accessToken });
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
}

module.exports = AuthService;
