import React from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

import dynamic from 'next/dynamic';
const DynamicSideMenu = dynamic(() => import('@/components/SideMenu'), {
  ssr: false,
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DynamicSideMenu />
      <div className="mr-[2rem] ml-[5rem] mt-[2rem] p-2 text-slate-500">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
