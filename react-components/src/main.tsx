import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import SearchPage from './pages/SearchPage';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  </React.StrictMode>
);
