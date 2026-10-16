import React from 'react';
import { createRoot } from 'react-dom/client';
import SixPackPromiseCard from './SixPackPromiseCard.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="max-w-xl mx-auto py-4">
      <SixPackPromiseCard />
    </main>
  </React.StrictMode>
);
