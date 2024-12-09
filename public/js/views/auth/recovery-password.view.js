import { sendEmailToChangePassword } from "../../controllers/auth.controller.js";
import { renderRoute } from "../../router.js";

export function renderRecoveryPassword(root){
  root.innerHTML = `
    <div class="auth-state sign-in-background">
      <section id="recovery-password" class="auth-container">
        <h1>Recovery password</h1>
        <div class="sign-in-error inactive">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>The email address is incorrect or not exist</p>
        </div>

        <form id="password-recovery-form">
          <div class="inputs-container">
              <label>Email address</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="email" id="email-sign-in" name="email" placeholder="example@email.com" required>
          </div>
          <button id="send-email-to-change-password" class="buttons-style auth-button-styles">Send email</button>
          <p class="text-footer-sign-in">Don't have an account? <strong id="go-to-sign-up">Sign up!</strong></p>
        </form>
      </section>
    </div>
  `;

  document.getElementById('recovery-password').addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.id === 'send-email-to-change-password'){
      sendEmailToChangePassword();
    }
    if(event.target.id === 'go-to-sign-up'){
      window.history.pushState(null, '', '/sign-up');
      renderRoute('/sign-up');
    }
  });
}
