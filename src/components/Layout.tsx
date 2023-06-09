import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import dynamic from 'next/dynamic';
import { useRefreshMutation } from '@/types/generated/types';

type LayoutProps = {
  children: React.ReactNode;
};

const DynamicSideMenu = dynamic(() => import('@/components/SideMenu'), {
  ssr: false,
});

const Layout = ({ children }: LayoutProps) => {
  const [refreshMutation /*, { data, loading, error }*/] = useRefreshMutation();

  return (
    <>
      <DynamicSideMenu />
      <div className="mr-[2rem] ml-[5rem] mt-[2rem] p-2 text-slate-500">
        <Header />
        <div id="contentLayout" className="min-h-[82vh]">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
