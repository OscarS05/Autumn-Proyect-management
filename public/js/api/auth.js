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

export async function signIn(credentials) {
  const response = await fetch(`${API_AUTH}/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
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
    throw new Error(error.message || 'Failed to resend verification email');
  }
  return await response.json();
}

export async function verifyEmail() {
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
      alert(`Error: ${data.message}`);
      return;
    }
    const { accessToken } = await response.json();
    if(accessToken){
      window.accessToken = accessToken;
      alert('¡Email verified successfully!');
      console.log(window.accessToken);
      localStorage.removeItem('email');

      // Redirect
    }else {
      alert('Error: No access token received');
    }
  } catch (error) {
    console.error('Error verifying email:', error);
    alert('There was a problem verifying the email');
  }
}

