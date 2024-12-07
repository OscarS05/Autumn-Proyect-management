import { signUp } from '../api/auth.js';
import { resendVerificationEmail } from '../api/auth.js';
import { renderRoute } from "../router.js";

export function handleSignUp() {
  const form = document.getElementById('sign-up-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userData = {
      name: document.getElementById('name-sign-up').value,
      email: document.getElementById('email-sign-up').value,
      password: document.getElementById('password-sign-up').value,
      confirmPassword: document.getElementById('confirm-password-sign-up').value,
    };
    try {
      const validation = validatePassword(userData.password);
      if (!validation.valid) {
        alert(validation.message);
      }
      const result = await signUp(userData);
      console.log('Backend response:', result);

      window.history.pushState(null, '', '/sign-up/verify-email');
      renderRoute('/sign-up/verify-email');
      localStorage.setItem('email', userData.email);
    } catch (error) {
      console.error('Sign up error:', error);
      alert(error.message);
    }
  });
}

function validatePassword(password){
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message: "The password must be at least 8 characters long, one capital letter, one number and one symbol. (!@#$%^&*).",
    };
  }
  return { valid: true, message: "Valide password." };
}


export async function handleResendVerificationEmail(){
  const email = localStorage.getItem('email');
  if (!email) {
    alert('Email not found. Please try again.');
    return;
  }
  try {
    const result = await resendVerificationEmail(email);
    alert(result.message || 'Verification email resent successfully!');
  } catch (error) {
    alert('Failed to resend verification email. Please try again later.');
  }
}
