import { changePasswordHandler } from "../../../controllers/auth.controller.js";

export function renderChangePassword(root){
  root.innerHTML = `
    <div class="auth-state sign-in-background">
      <section id="change-password" class="auth-container">
        <h1>Change password</h1>
        <div class="sign-in-error inactive">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>The email address or password is incorrect</p>
        </div>

        <form id="change-password-form">
          <div class="inputs-container">
              <label>Password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="new-password" name="password" placeholder="***************" required>
          </div>
          <div class="inputs-container">
              <label>Confirm password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="confirm-new-password" name="password" placeholder="***************" required>
          </div>
          <button id="save-password-button" class="buttons-style auth-button-styles">Save password</button>
        </form>
      </section>
    </div>
  `;

  document.getElementById('change-password').addEventListener('click', (event) => {
    if(event.target.id === 'save-password-button'){
      changePasswordHandler();
    }
  });
}
