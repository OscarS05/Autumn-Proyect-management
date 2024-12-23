console.log('JS Script Loaded');

import { renderSignIn } from "./views/auth/sign-in.view.js";
import { renderSignUp } from "./views/auth/sign-up.view.js";
import { renderRecoveryPassword } from "./views/auth/recovery-password.view.js";
import { renderVerifyEmail } from "./views/auth/verify-email.view.js";
import { renderEmailConfirmed } from "./views/auth/email-confirmed.view.js";
import { renderChangePassword } from "./views/auth/render-change-password.view.js";
import { renderProjectScreen } from "./views/project-screen/project-screen.view.js";

const routes = {
  // Auth
  '/sign-in': renderSignIn,
  '/sign-in/recovery-password': renderRecoveryPassword,
  '/sign-in/recovery-password/verify-email': renderVerifyEmail,
  '/sign-in/change-password': renderChangePassword,
  '/sign-up': renderSignUp,
  '/sign-up/verify-email': renderVerifyEmail,
  '/auth/verify-email/email-confirmed': renderEmailConfirmed,

  // ProjectScreen
  '/project-screen': renderProjectScreen,
};

export async function renderRoute(route) {
  const root = document.getElementById('root');

  const renderFunction = routes[route];
  if (renderFunction) {
    renderFunction(root);
  } else {
    document.body.innerHTML = `
      <div class="path-not-found">
        <img src="./assets/images/404-error-screen.png" style="width: 50vw;" alt="404-error-screen">
      </div>
    `;
    window.history.pushState(null, '', '/404');
  }
}

window.addEventListener('popstate', () => renderRoute(location.pathname));

if (location.pathname === '/') {
  window.history.pushState(null, '', '/sign-in');
  renderRoute('/sign-in');
}else {
  renderRoute(location.pathname);
}

export async function navigateTo(route) {
  window.history.pushState(null, '', route);
  renderRoute(route);
}
