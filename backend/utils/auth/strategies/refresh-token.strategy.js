const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const opts = {
  jwtFromRequest: (req) => {
    if (req && req.cookies) {
      return req.cookies.refreshToken;
    }
    return null;
  },
  secretOrKey: config.jwtSecret,
};

passport.use('refresh-token',
  new JwtStrategy(opts, (payload, done) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  })
);
