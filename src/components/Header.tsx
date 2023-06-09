/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo } from 'react';
import jwt_decode from 'jwt-decode';

import Link from 'next/link';
import AttendanceBtnGroup from './Attendance/AttendanceBtnGroup';
import AttendanceRecord from './Attendance/AttendanceRecord';
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image';

import { AuthData, jwtTokensVar } from '@/stores/gqlReactVars';
import { useLogoutMutation } from '@/types/generated/types';

import { Dropdown, Ripple, initTE } from 'tw-elements';

type IUserInfo = {
  userName: string;
  photoUrl: string;
};

const Header = () => {
  const tokens = useReactiveVar(jwtTokensVar);
  useEffect(() => {
    console.log('Header useEffect!!!', tokens);
    initTE({ Dropdown, Ripple });
  }, [tokens]);

  const [logoutMutation] = useLogoutMutation();

  const useUserInfo: IUserInfo | null = useMemo(() => {
    if (tokens?.accessToken) {
      const decoded = jwt_decode<AuthData>(tokens.accessToken);
      return { userName: decoded.userName, photoUrl: decoded.photoUrl || '' };
    }
    return null;
  }, [tokens]);

  const handleLogout = () => {
    logoutMutation({
      onCompleted: () => {
        jwtTokensVar(undefined);
        window.location.href = '/auth/login';
      },
    });
  };

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed z-[1000] left-0 right-0 top-0 flex w-full flex-nowrap items-center justify-between bg-white py-[0.6rem] text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700 dark:bg-zinc-700 lg:flex-wrap lg:justify-start xl:pl-60"
        data-te-navbar-ref
        data-te-dropdown-ref
      >
        {/* Container wrapper */}
        <div className="flex w-full flex-wrap items-center justify-between px-4">
          {/* Toggler */}

          <div className="basis-1/2">
            {tokens?.accessToken && (
              <div className="flex">
                <AttendanceBtnGroup />
                <AttendanceRecord />
              </div>
            )}
          </div>

          {/*  Right links */}
          <ul className="relative basis-1/2 flex justify-end items-center">
            {/* Avatar */}
            {tokens?.accessToken ? (
              <li className="relative">
                <a
                  className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  // href="#"
                  type="button"
                  data-te-dropdown-toggle-ref
                  aria-expanded="false"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  {useUserInfo?.photoUrl ? (
                    <Image
                      className="inline rounded-5"
                      src={process.env.NEXT_PUBLIC_BASE_PROFILE_API + '/' + useUserInfo?.photoUrl}
                      alt={useUserInfo?.userName || ''}
                      width={40}
                      height={40}
                    />
                  ) : (
                    useUserInfo?.userName
                  )}
                </a>

                <ul
                  className="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton2"
                  data-te-dropdown-menu-ref
                >
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref
                    >
                      My profile
                    </a>
                  </li>
                  <li>
                    <a
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                      href="#"
                      data-te-dropdown-item-ref
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      className="cursor-pointer block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
                      // href="#"
                      data-te-dropdown-item-ref
                      onClick={handleLogout}
                    >
                      로그아웃
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <Link href="/auth/login">
                <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                  <span className="sm:inline">로그인</span>
                </div>
              </Link>
            )}
          </ul>
        </div>
        {/* Container wrapper */}
      </nav>
    </>
  );
};

export default Header;
