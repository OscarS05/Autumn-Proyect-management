export function renderRoute(route) {
  const root = document.getElementById('root');
  const body = document.querySelector('body');

  switch (route) {
    case '/sign-in':
      root.innerHTML = `
        <h1>Sign in to Autumn</h1>
        <div class="sign-in-error inactive">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>The email address or password is incorrect</p>
        </div>

        <form id="sign-in-form">
          <div class="inputs-container">
              <label>Email address</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="email" id="email-sign-in" name="email" required>
          </div>
          <div class="inputs-container">
              <label>Password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="password-sign-in" name="password" required>
          </div>
          <div class="sign-in-options">
              <div>
                  <input type="checkbox" class="checkbox-remember-me" name="remember-sign-in">
                  Remember me
              </div>
              <p>Forgot password?</p>
          </div>
          <button class="buttons-style button-sign-in">Sign in</button>
          <p class="text-footer-sign-in">Don't have an account? <strong id="go-to-sign-up">Sign up!</strong></p>
        </form>
      `;
      body.classList.add('auth-state');
      root.classList.remove('sign-up');
      body.classList.remove('sign-up-background');
      body.classList.add('sign-in-background');
      root.classList.add('auth-container');
      root.classList.add('sign-in');

      document.getElementById('go-to-sign-up').addEventListener('click', () => {
        window.history.pushState(null, '', '/sign-up');
        renderRoute('/sign-up');
      });
      break;

    case '/sign-up':
      root.innerHTML = `
        <h1>Sign up to Autumn</h1>
        <div class="sign-in-error inactive">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <p>The email address or password is incorrect</p>
        </div>
        <form id="sign-up-form">
          <div class="inputs-container">
              <label>Email address</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="email" id="email-sign-up" name="email" required>
          </div>

          <div class="inputs-container">
              <label>Full name</label>
              <i class="fa-solid fa-user" style="color: #FFFFFF; font-size: 12px;"></i>
              <input type="text" id="name-sign-up" name="name" required>
          </div>

          <div class="inputs-container">
              <label>Password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="password-sign-up" name="password" required>
          </div>

          <div class="inputs-container">
              <label>Confirm password</label>
              <i class="fa-solid fa-lock" style="color: #ffffff;"></i>
              <input type="password" id="confirm-password-sign-up" name="password" required>
          </div>

          <button type="submit" class="buttons-style button-sign-in">Sign up</button>

          <p class="text-footer-sign-in">Have an account? <strong id="go-to-sign-in">Sign in!</strong></p>
        </form>
      `;
      body.classList.remove('sign-in-background');
      root.classList.remove('sign-in');
      body.classList.add('auth-state');
      root.classList.add('auth-container');
      root.classList.add('sign-up');
      body.classList.add('sign-up-background');

      document.getElementById('go-to-sign-in').addEventListener('click', () => {
        window.history.pushState(null, '', '/sign-in');
        renderRoute('/sign-in');
      });
      break;

    default:
      setTimeout(() => {
        window.history.pushState(null, '', '/sign-in');
        renderRoute('/sign-in');
      }, 0);
      break;
  }
}
