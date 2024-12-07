import { renderRoute } from "../router.js";

export function renderSignIn(root){
  root.innerHTML = `
    <div class="auth-state sign-in-background">
      <section id="sign-in" class="auth-container">
        <h1>Sign in to Autumn</h1>
        <div class="sign-in-error inactive">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>The email address or password is incorrect</p>
        </div>

        <form id="sign-in-form">
          <div class="inputs-container">
              <label>Email address</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="email" id="email-sign-in" name="email" placeholder="example@email.com" required>
          </div>
          <div class="inputs-container">
              <label>Password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="password-sign-in" name="password" placeholder="***************" required>
          </div>
          <div class="sign-in-options">
              <div>
                  <input type="checkbox" class="checkbox-remember-me" name="remember-sign-in">
                  Remember me
              </div>
              <p id="forgot-password">Forgot password?</p>
          </div>
          <button id="sign-in-button" class="buttons-style auth-button-styles">Sign in</button>
          <p class="text-footer-sign-in">Don't have an account? <strong id="go-to-sign-up">Sign up!</strong></p>
        </form>
      </section>
    </div>
  `;

  document.getElementById('sign-in').addEventListener('click', (event) => {
    if(event.target.id === 'sign-in-button'){
      window.history.pushState(null, `/project-screen`);
      renderRoute('/project-screen');
    }
    if(event.target.id === 'forgot-password'){
      window.history.pushState(null, '', '/sign-in/recovery-password');
      renderRoute('/sign-in/recovery-password');
    }
    if(event.target.id === 'go-to-sign-up'){
      window.history.pushState(null, '', '/sign-up');
      renderRoute('/sign-up');
    }
  });
}
