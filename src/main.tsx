import React from 'react';
import ReactDOM from 'react-dom/client';

// import ReactGA from 'react-ga4';

import App from './App.tsx';
import './index.css';
import AuthProvider from './context/AuthProvider.tsx';

// const GOOGLE_ANALYTICS_TAG = import.meta.env.VITE_GOOGLE_ANALYTICS_TAG;

// ReactGA.initialize(GOOGLE_ANALYTICS_TAG);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
