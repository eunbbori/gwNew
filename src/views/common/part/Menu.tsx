import React, { useEffect, useState } from 'react';

import laptopIcon from 'src/assets/svg/laptop.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import editIcon from 'src/assets/svg/edit.svg';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MenuItem = dynamic(import('./MenuItem'));
export interface IMenuProps {
  selectedMenu: string;
}

const employeeSubMenu = [
  {
    menuTitle: '직원목록',
    linkTitle: 'listEmp',
  },
  {
    menuTitle: '직원등록',
    linkTitle: 'addEmp',
  },
];
const Menu = ({ selectedMenu }: IMenuProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <aside className="max-w-62.5 ease-nav-brand z-990 fixed my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
      <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
        <ul className="flex flex-col pl-0 mb-0">
          <Link href="/dashboard">
            <MenuItem menuNm="대시보드" imgSrc={laptopIcon} selected={'dashboard' === selectedMenu} />
          </Link>
          <Link href="/member">
            <MenuItem menuNm="직원관리" imgSrc={userGroupIcon} selected={'member' === selectedMenu} submenu={employeeSubMenu} />
          </Link>
          <Link href="/dayoff">
            <MenuItem menuNm="휴가관리" imgSrc={flightIcon} selected={'dayoff' === selectedMenu} />
          </Link>
          <Link href="/attendance">
            <MenuItem menuNm="근태관리" imgSrc={alarmIcon} selected={'attendance' === selectedMenu} />
          </Link>
          <Link href="/approval">
            <MenuItem menuNm="결제" imgSrc={editIcon} selected={'approval' === selectedMenu} />
          </Link>
        </ul>
      </div>
    </aside>
  );
};

export default Menu;
