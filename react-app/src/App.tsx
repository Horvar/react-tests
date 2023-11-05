import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/people/:id" element={<DetailPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
