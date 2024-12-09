import { navigateTo, renderRoute } from '../router.js';
import { fetchWithToken } from '../utils/tokens.js';

export const API_BASE = 'http://localhost:3000'
const API_SIGN_UP = 'http://localhost:3000/api/v1/user';
export const API_AUTH = 'http://localhost:3000/api/v1/auth';

export async function signUp(userData) {
  const response = await fetch(`${API_SIGN_UP}/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign up');
  }
  return await response.json();
}

export async function signIn(userData) {
  const response = await fetch(`${API_AUTH}/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign in');
  }

  return await response.json();
}

export async function resendVerificationEmail(email){
  const response = await fetch(`${API_AUTH}/resend-verification-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error resending the email. Please try again.');
  }
  return await response.json();
}

export async function verifyEmailToActivateAccount() {
  const token = new URLSearchParams(window.location.search).get('token');
  if (!token) {
    alert('Token not provided');
    return;
  }
  try {
    const response = await fetch(`${API_AUTH}/verify-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const data = await response.json();
      alert(data.message || 'Something went wrong. Please try again!');
      return;
    }
    const { accessToken } = await response.json();
    if(accessToken){
      window.accessToken = accessToken;
      alert('¡Email verified successfully!');
      localStorage.removeItem('email');
      navigateTo('/project-screen');
    }else {
      alert('Error: No access token received');
    }
  } catch (error) {
    console.error('Error verifying email:', error);
  }
}

export async function verifyEmailToRecoverPassword(){
  const urlToken = new URLSearchParams(window.location.search).get('token');
  if (!urlToken) {
    alert('Token not provided');
    return;
  }
  try {
    const response = await fetch(`${API_AUTH}/verify-email-to-recover-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${urlToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      const data = await response.json();
      alert('Something went wrong. Please try again!');
      return;
    }
    const { message, token } = await response.json();
    if(message === 'Email verified successfully'){
      alert('¡Email verified successfully!');
      localStorage.removeItem('email');
      localStorage.removeItem('state');
      window.token = token;
      navigateTo('/sign-in/change-password');
      return message;
    }else {
      alert('Error: No access token received');
    }
  } catch (error) {
    console.error('Error verifying email:', error);
  }
}

export async function changePassword(credentials){
  const response = await fetch(`${API_AUTH}/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.token || ''}`
    },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to sign in');
  }
  return await response.json();
}
