

import React from 'react';
import { Meta, Links, Scripts, ScrollRestoration } from 'react-router';
import { AuthProvider, useAuth } from './core/utils/authContext';
import Login from './shared/components/Login';
import { App } from './app';
import './app.css';

const RootContent = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
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
