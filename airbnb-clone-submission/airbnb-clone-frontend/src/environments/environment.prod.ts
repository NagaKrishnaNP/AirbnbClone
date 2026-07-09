export const environment = {
  production: true,
  // IMPORTANT: '/api' only works if frontend and backend share an origin
  // (e.g. behind the same reverse proxy). On Render, the frontend (Static
  // Site) and backend (Web Service) get different domains, so this MUST be
  // the backend's full deployed URL, e.g.:
  // 'https://airbnb-clone-backend.onrender.com/api'
  apiUrl: 'https://airbnbclonesubmission.onrender.com/api',
  listingId: 'mirashya-ug10',
};
