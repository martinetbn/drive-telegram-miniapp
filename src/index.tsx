import ReactDOM from 'react-dom/client';
import App from './App';
import {
  init,
  miniApp,
  setMiniAppBackgroundColor,
} from '@telegram-apps/sdk-react';
import './assets/styles/globals.css';

init();
miniApp.mountSync();
setMiniAppBackgroundColor('#262525');

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
