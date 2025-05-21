import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Provider from './provider';
import App from './app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
