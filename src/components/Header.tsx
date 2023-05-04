/* eslint-disable react/no-unknown-property */
import React from 'react';
import Image from 'next/image';

import jnFirstLogo from 'src/assets/img/jnfirst.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faGear, faBell } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <>
      <div className="flex h-19.5">
        <a className="flex px-8 py-4 m-0 text-base whitespace-nowrap" href="javascript:;" target="_blank" rel="noreferrer">
          <Image src={jnFirstLogo} className="inline w-16 h-full" alt="main_logo" />
          <span className="self-center ml-4 font-semibold text-sky-700">JF Groupware</span>
        </a>
        <div className="justify-end relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
          <div className="flex">
            <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
            <input
              type="text"
              className="self-center pl-8.75 mr-5 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 relative w-60 h-12 -ml-px block rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
              placeholder="Type here..."
            />
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
      <hr className="w-65 h-px mt-5 bg-gray-200 border-0 dark:bg-gray-700" />
    </>
  );
};

export default Header;
