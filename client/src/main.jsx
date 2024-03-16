import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ChakraBaseProvider } from '@chakra-ui/react';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraBaseProvider>
      <App />
    </ChakraBaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
