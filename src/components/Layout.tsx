import React from 'react';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="m-7 p-2">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
