/* eslint-disable react/no-unknown-property */

import React from 'react';
import { useRouter } from 'next/router';

import { RouteInfo, routeInfos, defaultRouteInfo } from '@/repository/RouteInfo';
import Menu from '@/views/common/part/Menu';
import Title from '@/views/common/part/Title';
import Content from '@/views/common/part/Content';

const Frame = () => {
  const router = useRouter();
  const routeInfo: RouteInfo = routeInfos.find((e) => router.query.slug === e.id) || defaultRouteInfo;

  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default text-slate-500">
      {/* sidenav  */}
      <Menu selectedMenu={routeInfo.id} />
      {/* end sidenav */}
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        {/* Navbar */}
        <Title name={routeInfo.name} img={routeInfo.img} />
        {/* end Navbar */}
        {/* cards */}
        <Content content={routeInfo.content} />
        {/* end cards */}
      </main>
    </div>
  );
};

export default Frame;
