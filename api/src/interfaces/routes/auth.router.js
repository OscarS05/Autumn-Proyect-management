const express = require('express');
const router = express.Router();

const passport = require('passport');
const { changePasswordSchema } = require('../schemas/user.schema');

const { validatorHandler } = require('../middlewares/validator.handler')
const { limiter, validateSession } = require('../middlewares/authentication.handler');

const {
  login,
  verifyEmailToActivateAccount,
  verifyEmailToRecoveryPassword,
  changePassword,
  sendVerificationEmail,
  resendVerificationEmail,
  validateSessionController,
  validateTokenToVerifyEmail,
} = require('../controllers/auth.contoller');


router.post('/login',
  passport.authenticate('local', { session: false }),
  login
);

router.post('/send-verification-email',
  limiter(3, 15 * 60 * 100),
  sendVerificationEmail
);

router.post('/resend-verification-email',
  limiter(3, 15 * 60 * 100),
  resendVerificationEmail
);

router.post('/verify-email',
  verifyEmailToActivateAccount
);

router.post('/verify-email-to-recover-password',
  verifyEmailToRecoveryPassword
);

router.patch('/password',
  validatorHandler(changePasswordSchema, 'body'),
  changePassword
);

router.post('/validate-session',
  validateSession,
  validateSessionController,
)

router.post('/validate-tokens-to-verify-email',
  validateTokenToVerifyEmail
)

module.exports = router;
