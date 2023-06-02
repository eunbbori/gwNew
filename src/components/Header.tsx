/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo } from 'react';
import jwt_decode from 'jwt-decode';

import jnFirstLogo from 'src/assets/img/jnfirst.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faBell, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import CompanyLogo from './CompanyLogo';
import Link from 'next/link';
import AttendanceBtnGroup from './Attendance/AttendanceBtnGroup';
import AttendanceRecord from './Attendance/AttendanceRecord';
import { useReactiveVar } from '@apollo/client';

import { AuthData, jwtTokensVar, startEndAtVar } from '@/modules/gqlReactVars';
import { useRefreshMutation, useLogoutMutation } from '@/types/generated/types';

const Header = () => {
  const [refreshMutation /*, { data, loading, error }*/] = useRefreshMutation();
  const [logoutMutation] = useLogoutMutation();
  /*
  if (loading) return <>Refreshing...</>
  if (error) return <>Refreshing error! ${error.message}</>
*/
  const tokens = useReactiveVar(jwtTokensVar);

  const attendanceDivClass = 'relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft';

  const useUserName = useMemo(() => {
    return tokens?.accessToken ? jwt_decode<AuthData>(tokens.accessToken).userName : null;
  }, [tokens]);

  useEffect(() => {
    refreshMutation({
      onCompleted: (data) => {
        if (data?.refresh) {
          jwtTokensVar({ accessToken: data.refresh?.accessToken || '' });
          startEndAtVar({
            startAt: data.refresh?.startAt,
            endAt: data.refresh?.endAt,
          });
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }, []);

  const handleLogout = () => {
    logoutMutation({
      onCompleted: () => {
        jwtTokensVar(undefined);
        window.location.href = '/';
      },
    });
  };

  return (
    <>
      <div className="flex h-10 ">
        <CompanyLogo imgSrc={jnFirstLogo} companyNm="JF Groupware" />
        <div className={`${tokens?.accessToken ? 'justify-between ' + attendanceDivClass : 'justify-end ' + attendanceDivClass}`}>
          {tokens?.accessToken && (
            <div className="flex ml-[50px]">
              <AttendanceBtnGroup />
              <AttendanceRecord />
            </div>
          )}
          <ul className="flex">
            <li className="flex items-center">
              {tokens?.accessToken ? (
                <div
                  onClick={handleLogout}
                  className="self-center cursor-pointer block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500"
                >
                  <span className="hidden sm:inline ml-5">
                    <FontAwesomeIcon className="sm:mr-1" icon={faRightFromBracket} />
                    {useUserName}
                  </span>
                </div>
              ) : (
                <Link href="/auth/login">
                  <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                    <FontAwesomeIcon className="sm:mr-1" icon={faUser} />
                    <span className="hidden sm:inline">로그인</span>
                  </div>
                </Link>
              )}
            </li>
            <li className="flex items-center px-4">
              <a href="javascript:;" className="p-0 transition-all text-sm ease-nav-brand text-slate-500">
                <FontAwesomeIcon fixed-plugin-button-nav="true" className="cursor-pointer" icon={faGear} />
              </a>
            </li>
            <li className="relative flex items-center pr-2">
              <p className="hidden transform-dropdown-show" />
              <a href="javascript:;" className="block p-0 transition-all text-sm ease-nav-brand text-slate-500" dropdown-trigger="true" aria-expanded="false">
                <FontAwesomeIcon className="cursor-pointer" icon={faBell} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="h-px mt-3 bg-gray-200 border-0 dark:bg-gray-700" />
    </>
  );
};

export default Header;
