import { renderSignIn } from "./views/sign-in.view.js";
import { renderSignUp } from "./views/sign-up.view.js";
import { renderRecoveryPassword } from "./views/recovery-password.view.js";
import { renderVerifyEmail } from "./views/verify-email.view.js";
import { renderEmailConfirmed } from "./views/email-confirmed.view.js";

const routes = {
  '/sign-in': renderSignIn,
  '/sign-up': renderSignUp,
  '/sign-in/recovery-password': renderRecoveryPassword,
  '/sign-in/recovery-password/verify-email': renderVerifyEmail,
  '/sign-in/recovery-password/email-confirmed': renderEmailConfirmed,
  '/sign-up/verify-email': renderVerifyEmail,
  '/sign-up/verify-email/email-confirmed': renderEmailConfirmed,
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

// window.history.pushState(null, '', '/sign-up/verify-email/email-confirmed');
// renderRoute('/sign-up/verify-email/email-confirmed');
// export function navigateTo(route) {
//   window.history.pushState(null, '', route);
//   renderRoute(route);
// }
