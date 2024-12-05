const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');
const service = new UserService();
const { config } = require('./../config/config');


class AuthService {
  constructor() {}

  async sendEmailConfirmation(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.notFound('User not found');
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://autumnManagement.com/sign-up/verify-email?token=${token}`
    await service.update(user.id, {recoveryToken: token});
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Click on the link to confirm email",
      html: `<b>Click here: ${link}</b>`,
    }

    const send = await this.sendMail(mail);
    // ENVIAR EL TOKEN SOLO DE MANERA TEMPORAL MIENTRAS SE HACE EL FRONT
    return { send, token };
  }

  async verifyEmail(token){
    const payload = jwt.verify(token, config.jwtSecret);
    const user = await service.findOne(payload.sub);
    if(!user){
      throw boom.notFound('Not found');
    }
    if(user.recoveryToken !== token){
      throw boom.unauthorized();
    }

    if (user.isVerified) {
      throw boom.badRequest('Email already verified');
    }
    await service.update(payload.sub, { isVerified: true, recoveryToken: null});
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
