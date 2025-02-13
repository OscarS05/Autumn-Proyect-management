import { handleResendVerificationEmail } from "../../../controllers/auth.controller.js";

export function renderVerifyEmail(root){
  root.innerHTML = `
    <div id="sent-email-container" class="auth-state sign-up-background">
      <section class="sent-email-content">
        <h1>Email has been sent!</h1>
        <p class="sent-email-subtitle">Please check your email to verify it.</p>

        <div class="email-image">
          <i class="fa-regular fa-envelope" style="font-size: 56px;"></i>
        </div>

        <p class="text-footer">
          <span>Didn't receive the email?</span>
          <strong id="resend-email">Resend</strong>
        </p>
      </section>
    </div>
  `;

  document.getElementById('sent-email-container').addEventListener('click', async (event) => {
    if(event.target.id === "resend-email"){
      handleResendVerificationEmail();
    }
  });
}
