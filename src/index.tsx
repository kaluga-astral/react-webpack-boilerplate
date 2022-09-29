import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw Error('rootElement is not find');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
