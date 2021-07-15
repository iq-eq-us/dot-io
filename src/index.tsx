import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app/App';
import './assets/global.css';

// This is the entry point to the React application
// All pages, components, and functionality lives under this umbrella
// Start by entering the <App /> component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
