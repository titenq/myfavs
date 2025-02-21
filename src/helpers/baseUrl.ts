const env = import.meta.env.VITE_ENV;

let frontendBaseUrl = 'http://localhost:5173';
let backendBaseUrl = 'http://localhost:3300';

if (env === 'PROD') {
  frontendBaseUrl = import.meta.env.VITE_FRONTEND_BASE_URL;
  backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
}

export {
  frontendBaseUrl,
  backendBaseUrl
};
