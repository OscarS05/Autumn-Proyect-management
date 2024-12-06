import { renderRoute } from './router.js';

window.addEventListener('popstate', () => {
  renderRoute(window.location.pathname);
});

// Renderizar la ruta inicial cuando cargue la página
renderRoute(window.location.pathname);
