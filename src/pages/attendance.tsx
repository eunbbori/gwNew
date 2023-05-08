/* eslint-disable react/no-unknown-property */

import React from 'react';

import laptopIcon from 'src/assets/svg/laptop.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import editIcon from 'src/assets/svg/edit.svg';
import NavTitle from '@/views/common/NavTitle';
import DateMemberCnt from '@/views/attendance/DateMemberCnt';
import TableHeader from '@/views/attendance/TableHeader';
import TableRows from '@/views/attendance/TableRows';
import MenuItem from '@/views/common/left/menuItem';
import Menu from '@/views/common/left/menu';

const Attendance = () => {
  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default text-slate-500">
      {/* sidenav  */}
      <Menu selectedMenu={'attendance'} />
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

export default Attendance;
