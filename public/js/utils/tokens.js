import { API_AUTH } from '../api/auth.js';
import { renderRoute } from '../router.js';

export async function fetchWithToken(url, options = {}) {
  try {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${window.accessToken || ''}`,
    };
    const response = await fetch(url, options);
    if (response.status === 401) {
      console.warn('Access token expired, attempting to refresh...');

      const tokenResponse = await fetch(`${API_AUTH}/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (tokenResponse.ok) {
        const { newAccessToken } = await tokenResponse.json();

        window.accessToken = newAccessToken;
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };
        return fetch(url, options);
      } else {
        console.error('Failed to renew token. Redirecting to login...');
        window.history.pushState(null, '', '/sign-in');
        renderRoute('/sign-in')
        return
      }
    }
    return response;
  } catch (error) {
    console.error('Error fetching with token:', error);
    throw error;
  }
}
