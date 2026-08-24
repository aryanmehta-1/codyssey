import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { StudentProvider } from './context/StudentContext.jsx';
import { NavigationProvider } from './context/NavigationContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <StudentProvider>
        <NavigationProvider>
          <App />
        </NavigationProvider>
      </StudentProvider>
    </AuthProvider>
  </React.StrictMode>
);