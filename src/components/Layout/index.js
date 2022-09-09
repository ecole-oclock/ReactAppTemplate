import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
}
export default Layout;
