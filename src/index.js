import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MenuPrincipal from './MenuPrincipal'
import Footer from './Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <MenuPrincipal />
    <App />
    <Footer />
  </>
);
