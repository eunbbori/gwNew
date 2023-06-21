/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';
import jwt_decode from 'jwt-decode';

import Link from 'next/link';
import AttendanceBtnGroup from './Attendance/AttendanceBtnGroup';
import AttendanceRecord from './Attendance/AttendanceRecord';
import { useReactiveVar } from '@apollo/client';
import Image from 'next/image';

import { AuthData, jwtTokensVar } from '@/stores/gqlReactVars';
import { useLogoutMutation } from '@/types/generated/types';
import { useRouter } from 'next/router';

type IUserInfo = {
  userName: string;
  photoUrl: string;
};

const Header = () => {
  const [logoutMutation] = useLogoutMutation();

  const tokens = useReactiveVar(jwtTokensVar);

  const { push } = useRouter();

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
        push('/auth/login');
      },
    });
  };

  return (
    <>
      <nav
        id="main-navbar"
        className="fixed left-0 right-0 top-0 flex w-full flex-nowrap items-center justify-between bg-white py-[0.6rem] text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700 dark:bg-zinc-700 lg:flex-wrap lg:justify-start xl:pl-60"
        data-te-navbar-ref
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
              <li className="relative" onClick={handleLogout} data-te-dropdown-ref>
                <a
                  className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                  href="#"
                  aria-expanded="false"
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
