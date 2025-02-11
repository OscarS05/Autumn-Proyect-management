import { changePassword, signIn, signUp } from '../api/auth.js';
import { resendVerificationEmail, sendVerificationEmail } from '../api/auth.js';
import { navigateTo, renderRoute } from "../router.js";

export async function signInHandler() {
  const userData = {
    email: document.getElementById('email-sign-in').value,
    password: document.getElementById('password-sign-in').value,
    rememberMe: document.getElementById('remember-session').checked,
  };
  try {
    const validation = validatePassword(userData.password);
    if (!validation.valid) {
      alert(validation.message);
    }
    const { accessToken } = await signIn(userData);
    if (accessToken) {
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', accessToken);
      alert('¡Email verified successfully!');
      navigateTo('/project-screen');
    } else {
      alert('Error logging. Please try again!');
    }
  } catch (error) {
    console.error('Sign up error:', error);
    alert(error.message || 'Error logging. Please try again!');
  }
}

export async function handleSignUp() {
  const userData = {
    name: document.getElementById('name-sign-up').value,
    email: document.getElementById('email-sign-up').value,
    password: document.getElementById('password-sign-up').value,
    confirmPassword: document.getElementById('confirm-password-sign-up').value,
  };
  try {
    if (userData.password !== userData.confirmPassword) {
      alert('The passwords do not match');
      return;
    }
    const validation = validatePassword(userData.password);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
    const result = await signUp(userData);
    console.log('Backend response:', result);
    navigateTo('/sign-up/verify-email');
    localStorage.removeItem('state');
  } catch (error) {
    console.error('Sign up error:', error);
    alert(`Error: ${error.message}`);
  }
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message: "The password must be at least 8 characters long, one capital letter, one number and one symbol. (!@#$%^&*).",
    };
  }
  return { valid: true, message: "Valide password." };
}

export async function handleResendVerificationEmail() {
  try {
    const result = await resendVerificationEmail();
    alert(result.message || 'Verification email resent successfully!');
    return result;
  } catch (error) {
    if (error.message.includes('Too many email requests')) {
      alert('You have exceeded the maximum number of attempts. Please try again later.');
    } else {
      alert('Failed to resend verification email. Please try again later.');
    }
  }
}

export async function sendEmailToChangePassword() {
  const form = document.getElementById('password-recovery-form');
  const userEmail = document.getElementById('email-sign-in').value;
  if (!userEmail) {
    alert('You need to write an email.');
  }
  try {
    const response = await sendVerificationEmail(userEmail);
    if (response) {
      alert('Verification email resent successfully!');
      localStorage.setItem('state', 'change-password');
      navigateTo('/sign-in/recovery-password/verify-email');
    } else {
      alert('Error send email. Try again');
    }
  } catch (error) {
    console.error('Internal server error');
    alert(error.message || 'Error logging');
  }
}

export async function changePasswordHandler() {
  const form = document.getElementById('change-password-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userData = {
      newPassword: document.getElementById('new-password').value,
      confirmNewPassword: document.getElementById('confirm-new-password').value,
    };
    try {
      const validation = validatePassword(userData.newPassword);
      if (!validation.valid) {
        alert(validation.message);
      }
      const response = await changePassword(userData);
      if (response) {
        alert('¡Password changed successfully! Please, sign in.');
        localStorage.removeItem('state');
        localStorage.removeItem('accessToken');
        navigateTo('/sign-in');
      } else {
        alert('Error changing password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert(error.message || 'Error changing password');
    }
  });
}
