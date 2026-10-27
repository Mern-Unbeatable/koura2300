import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { hydratePostedMediaCache } from './services/postedMediaStore';
import { reportWebVitals, detectLongTasks, checkPerformanceBudget } from './utils/web-vitals';

hydratePostedMediaCache();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (process.env.NODE_ENV !== 'production') {
  reportWebVitals();
  detectLongTasks();
  checkPerformanceBudget();
}
