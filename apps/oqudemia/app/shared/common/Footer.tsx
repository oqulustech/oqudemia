import React from 'react';

const Footer: React.FC = () => (
  <footer className="footer mt-auto py-3 bg-dark text-white">
    <div className="container text-center">
      <span>&copy; {new Date().getFullYear()} Oqudemia. All rights reserved.</span>
    </div>
  </footer>
);

export { Footer };
