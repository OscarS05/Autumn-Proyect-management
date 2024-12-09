import { renderSignIn } from "./views/sign-in.view.js";
import { renderSignUp } from "./views/sign-up.view.js";
import { renderRecoveryPassword } from "./views/recovery-password.view.js";
import { renderVerifyEmail } from "./views/verify-email.view.js";
import { renderEmailConfirmed } from "./views/email-confirmed.view.js";
import { renderProjectScreen } from "./views/project-screen.view.js";
import { renderChangePassword } from "./views/render-change-password.view.js";

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

export function renderRoute(route) {
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

export function navigateTo(route) {
  window.history.pushState(null, '', route);
  renderRoute(route);
}
