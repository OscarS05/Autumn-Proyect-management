import { verifyEmail } from "../api/auth.js";
import { renderRoute } from "../router.js";

export function renderEmailConfirmed(root) {
  root.innerHtml = `
    <div class="">HOLA</div>
  `;
  verifyEmail();
}
