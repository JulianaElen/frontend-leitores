import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MenuPrincipal from './components/MenuPrincipal/MenuPrincipal'
import Footer from './components/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MenuPrincipal />
    <App />
    <Footer />
  </BrowserRouter>
);
