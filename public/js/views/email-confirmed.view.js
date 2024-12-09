import { verifyEmailToActivateAccount, verifyEmailToRecoverPassword } from "../api/auth.js";
import { renderRoute } from "../router.js";

export function renderEmailConfirmed(root) {
  root.innerHtml = `
    <div class=""></div>
  `;
  if(localStorage.getItem('state')){
    verifyEmailToRecoverPassword();
  }else {
    verifyEmailToActivateAccount();
  }
}
