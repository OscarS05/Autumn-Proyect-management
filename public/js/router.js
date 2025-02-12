console.log('JS Script Loaded');

//  Views
import { renderSignIn } from "./views/auth/sign-in.view.js";
import { renderSignUp } from "./views/auth/sign-up.view.js";
import { renderRecoveryPassword } from "./views/auth/recovery-password.view.js";
import { renderVerifyEmail } from "./views/auth/verify-email.view.js";
import { renderEmailConfirmed } from "./views/auth/email-confirmed.view.js";
import { renderChangePassword } from "./views/auth/render-change-password.view.js";
import { renderProjectScreen } from "./views/project-screen/project-screen.view.js";

// APIs
import { validateSession } from './api/auth.js';
import { validateTokensToVerifyEmail } from './api/auth.js';

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

  const isValid = await protectPrivateRoutes(route);
  if(!isValid) return;

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

async function protectPrivateRoutes(route){
  try {
    if (route === '/project-screen'){
      if(!(await validateSession())){
        navigateTo('/sign-in');
        return false;
      }
    } else if (route === '/sign-in/recovery-password/verify-email'){
      if(!(await validateTokensToVerifyEmail())){
        navigateTo('/sign-in/recovery-password');
        return false;
      }
    } else if (route === '/sign-up/verify-email'){
      if(!(await validateTokensToVerifyEmail())){
        navigateTo('/sign-up');
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error('Error to validate the route:', error);
    navigateTo('/sign-in');
    return false;
  }
}

window.addEventListener('popstate', () => renderRoute(location.pathname));

async function validateRoutes(){
  const pathname = location.pathname;

  if (pathname === '/') {
    return await navigateTo('/sign-in');
  }
  return await renderRoute(pathname);
}

validateRoutes();

export async function navigateTo(route) {
  window.history.pushState(null, '', route);
  renderRoute(route);
}
