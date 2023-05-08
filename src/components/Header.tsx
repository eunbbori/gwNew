/* eslint-disable react/no-unknown-property */
import React from 'react';
import Image from 'next/image';

import jnFirstLogo from 'src/assets/img/jnfirst.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faBell } from '@fortawesome/free-solid-svg-icons';
import Search from './Search';
import CompanyLogo from './CompanyLogo';

const Header = () => {
  return (
    <>
      <div className="flex h-10">
        <CompanyLogo imgSrc={jnFirstLogo} companyNm="JF Groupware" />
        <div className="justify-end relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
          <div className="flex">
            <Search />
          </div>
          <ul className="flex">
            <li className="flex items-center">
              <a href="./pages/sign-in.html" className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                <FontAwesomeIcon className="sm:mr-1" icon={faUser} />
                <span className="hidden sm:inline">로그인</span>
              </a>
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
