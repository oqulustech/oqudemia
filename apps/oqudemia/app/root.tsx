

import React from 'react';
import { useState, useEffect } from 'react';
import { Meta, Links, Scripts, ScrollRestoration } from 'react-router';
import { AuthProvider, useAuth } from './core/utils/authContext';
import Login from './shared/components/Login';
import SessionExpire from './shared/components/SessionExpire';
import { App } from './app';
import './app.css';

const RootContent = () => {
  const { isAuthenticated, logout, extendSession } = useAuth();
  const [expireModalOpen, setExpireModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setExpireModalOpen(false);
      window.sessionStorage.removeItem('token_expiry_alerted');
      return;
    }
    let alerted = false;
    const checkExpiry = () => {
      const token = localStorage.getItem('token');
      const expiresAt = parseInt(localStorage.getItem('token_expires_at') || '0', 10);
      if (!token || !expiresAt) {
        setExpireModalOpen(false);
        window.sessionStorage.removeItem('token_expiry_alerted');
        alerted = false;
        return;
      }
      const timeLeft = expiresAt - Date.now();
      if (timeLeft <= 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('token_expires_at');
        setExpireModalOpen(false);
        window.sessionStorage.removeItem('token_expiry_alerted');
        alerted = false;
        window.location.href = '/';
        return;
      }
      if (timeLeft < 10 * 1000 && timeLeft > 0) {
        if (!alerted) {
          setExpireModalOpen(true);
          window.sessionStorage.setItem('token_expiry_alerted', '1');
          alerted = true;
        }
      } else {
        setExpireModalOpen(false);
        window.sessionStorage.removeItem('token_expiry_alerted');
        alerted = false;
      }
    };
    const interval = setInterval(checkExpiry, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleContinueSession = () => {
    extendSession();
    setExpireModalOpen(false);
  };

  const handleLogoutSession = () => {
    logout();
    setExpireModalOpen(false);
  };

  return (
    <>
      <SessionExpire open={expireModalOpen} onContinue={handleContinueSession} onLogout={handleLogoutSession} />
      {isAuthenticated ? <App /> : <Login />}
    </>
  );
};

const Root = () => (
  <html lang="en">
    <head>
      <title>Welcome to Oqudemia</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <AuthProvider>
        <RootContent />
      </AuthProvider>
      <ScrollRestoration />
      <Scripts />
      {/* Bootstrap JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoA6VZgQK3Q9p3p1ZCk5F5Q5F5F5F5F5F5F5F5F5F5F5F5F" crossOrigin="anonymous"></script>
    </body>
  </html>
);

export default Root;
