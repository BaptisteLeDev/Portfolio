import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Ajouter l'icône et le titre
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/svg+xml';
favicon.href = '/Logo_BDDev.svg';
document.head.appendChild(favicon);

// Configurer le viewport
const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(viewport);

// Définir le titre du document
document.title = 'Baptiste Le Dev';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
