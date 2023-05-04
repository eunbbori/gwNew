/* eslint-disable react/no-unknown-property */

import React from 'react';

import DateMemberCnt from './attendance/dateMemberCnt';
import TableHeader from './attendance/tableHeader';
import TableRows from './attendance/tableRows';
import MenuItem from './common/left/menuItem';
import NavTitle from './common/navTitle';

import laptopIcon from 'src/assets/svg/laptop.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import editIcon from 'src/assets/svg/edit.svg';

const TestPage = () => {
  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default text-slate-500">
      {/* sidenav  */}
      <aside className="max-w-62.5 ease-nav-brand z-990 fixed my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
            <MenuItem menuNm="대시보드" imgSrc={laptopIcon} url="./pages/dashboard.html" selected={true} />
            <MenuItem menuNm="직원관리" imgSrc={userGroupIcon} url="./pages/tables.html" />
            <MenuItem menuNm="휴가관리" imgSrc={flightIcon} url="./pages/billing.html" />
            <MenuItem menuNm="근태관리" imgSrc={alarmIcon} url="./pages/virtual-reality.html" />
            <MenuItem menuNm="결제" imgSrc={editIcon} url="./pages/profile.html" />
          </ul>
        </div>
      </aside>
      {/* end sidenav */}
      <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        {/* Navbar */}
        <nav
          className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
          navbar-main="true"
          navbar-scroll="true"
        >
          <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
            <NavTitle navTitle={'근태관리'} imgSrc={alarmIcon} />
          </div>
        </nav>
        {/* end Navbar */}
        {/* cards */}
        <div className="w-full px-6 py-0 mx-auto">
          {/* cards row 4 */}
          <div className="flex flex-wrap my-1 -mx-3">
            <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:flex-none lg:flex-none">
              <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                  <div className="flex flex-wrap mt-0 -mx-3">
                    <DateMemberCnt dt={new Date()} cnt={15} />
                  </div>
                </div>
                <div className="flex-auto p-6 px-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                      <TableHeader />
                      <tbody>
                        <TableRows />
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end cards */}
      </main>
    </div>
  );
};

export default TestPage;
