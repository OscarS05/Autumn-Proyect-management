import { navigateTo, renderRoute } from "../router.js";
import { handleSignUp } from "../controllers/auth.controller.js";

export function renderSignUp(root) {
    root.innerHTML = `
    <div class="auth-state sign-up-background">
      <section id="sign-up" class="auth-container">
        <h1>Sign up to Autumn</h1>
        <div class="sign-in-error inactive">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>The email address or password is incorrect</p>
        </div>
        <form id="sign-up-form">
          <div class="inputs-container">
              <label>Email address</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="email" id="email-sign-up" name="email" placeholder="example@email.com" required>
          </div>

          <div class="inputs-container">
              <label>Full name</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="text" id="name-sign-up" name="name" placeholder="Your name" required>
          </div>

          <div class="inputs-container">
              <label>Password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="password-sign-up" name="password" placeholder="***************" required>
          </div>

          <div class="inputs-container">
              <label>Confirm password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="confirm-password-sign-up" name="password" placeholder="***************" required>
          </div>

          <button type="submit" id="sign-up-button" class="buttons-style auth-button-styles">Sign up</button>

          <p class="text-footer-sign-in">Have an account? <strong id="go-to-sign-in">Sign in!</strong></p>
        </form>
      </section>
    </div>
  `;

  document.getElementById('sign-up').addEventListener('click', (event) => {
    if(event.target.id === 'sign-up-button'){
      event.preventDefault();
      handleSignUp();
    }
    if(event.target.id === 'go-to-sign-in'){
      navigateTo('/sign-in');
    }
  });
}
