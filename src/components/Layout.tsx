import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Sidenav, initTE } from 'tw-elements';
import SideMenu from '@/components/SideMenu';
import Header from '@/components/Header';

type LayoutProps = {
  children: React.ReactNode;
};

type IUserInfo = {
  userName: string;
  photoUrl: string;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        {/* Sidenav */}
        <SideMenu />
        {/* Sidenav */}

        {/* Navbar */}
        <Header />
        {/* Navbar */}
      </header>
      {/* Main Navigation */}

      {/*Main layout */}
      <main style={{ marginTop: '58px' }}>
        <div id="content" className="ml-4 min-h-screen w-full bg-gray-50 !pl-0 sm:!pl-60">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
