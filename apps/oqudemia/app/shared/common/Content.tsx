import React from 'react';
import { Outlet } from 'react-router-dom';

const Content: React.FC = () => (
  <main className="p-4 bg-light rounded shadow-sm" style={{minHeight: '80vh'}}>
    <Outlet />
  </main>
);

export { Content };
