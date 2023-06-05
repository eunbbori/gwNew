import React, { useEffect } from 'react';
import Image from 'next/image';
import { Sidenav, initTE } from 'tw-elements';
import { routeInfos } from '../repository/RouteInfo';
import Link from 'next/link';

const SideMenu = () => {
  useEffect(() => {
    initTE({ Sidenav });
  }, []);

  return (
    <>
      <div>
        <nav
          id="sidenav-4"
          className="group fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-slim='true']:hidden data-[te-sidenav-slim-collapsed='true']:w-[77px] data-[te-sidenav-slim='true']:w-[77px] data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800 [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='false']]:hidden [&[data-te-sidenav-slim-collapsed='true'][data-te-sidenav-slim='true']]:[display:unset]"
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-mode="side"
          data-te-sidenav-slim="true"
          data-te-sidenav-expand-on-hover="true"
          data-te-sidenav-content="#slim-content"
          data-te-sidenav-slim-collapsed="true"
        >
          <ul id="sidenav-4-ul" className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
            {routeInfos.map((el, idx) => (
              <li key={idx} className="relative">
                <a
                  className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>div]:h-4 [&>div]:w-4 [&>div]:text-gray-400 dark:[&>div]:text-gray-300">
                    <div>
                      <Image src={el.img} alt={el.name} />
                    </div>
                  </span>
                  <span className="group-[&[data-te-sidenav-slim-collapsed='true']]:data-[te-sidenav-slim='false']:hidden" data-te-sidenav-slim="false">
                    {el.name}
                  </span>
                  <span
                    className="absolute right-0 ml-auto mr-[0.5rem] transition-transform duration-300 ease-linear motion-reduce:transition-none [&>svg]:text-gray-600 dark:[&>svg]:text-gray-300"
                    data-te-sidenav-rotate-icon-ref
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
                {el.submenu?.map((el2, idx) => (
                  <ul key={idx} className="!visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block " data-te-sidenav-collapse-ref>
                    <Link href={`/${el.id}/${el2.linkTitle}`}>
                      <li key={idx} className="relative">
                        <div
                          className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-600 outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                          data-te-sidenav-link-ref
                        >
                          {el2.menuTitle}
                        </div>
                      </li>
                    </Link>
                  </ul>
                ))}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideMenu;
