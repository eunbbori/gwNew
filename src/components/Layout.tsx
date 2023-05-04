import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="m-7 p-2 text-slate-500">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
