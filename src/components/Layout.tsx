import React from 'react';
import dynamic from 'next/dynamic';
import BreadCrumb from './BreadCrumb/BreadCrumb';

type LayoutProps = {
  children: React.ReactNode;
};

type IUserInfo = {
  userName: string;
  photoUrl: string;
};

const DynamicSideMenu = dynamic(() => import('@/components/SideMenu'), {
  ssr: false,
});
const DynamicHeader = dynamic(() => import('@/components/Header'), {
  ssr: false,
});

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        {/* Sidenav */}
        <DynamicSideMenu />
        {/* Sidenav */}

        {/* Navbar */}
        <DynamicHeader />
        {/* Navbar */}
      </header>
      {/* Main Navigation */}

      {/*Main layout */}
      <main style={{ marginTop: '58px' }}>
        <div id="content" className="px-3 xl:pl-64 pt-5 w-full" style={{ transition: 'all 0s ease 0s' }}>
          <BreadCrumb />
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
