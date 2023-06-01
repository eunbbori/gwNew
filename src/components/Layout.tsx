import React from 'react';
import Header from './Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';

type LayoutProps = {
  children: React.ReactNode;
};

const DynamicSideMenu = dynamic(() => import('@/components/SideMenu'), {
  ssr: false,
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <DynamicSideMenu />
      <div className="mr-[2rem] ml-[5rem] mt-[2rem] p-2 text-slate-500">
        <Header />
        <div className="min-h-[82vh]">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
