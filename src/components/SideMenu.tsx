import React, { useEffect } from 'react';
import Image from 'next/image';
import { allMenuInfos, RouteInfo, getRouteInfo } from '../repository/RouteInfo';
import Link from 'next/link';
import CompanyLogo from './CompanyLogo';
import jnFirstLogo from 'src/assets/img/jnfirst.png';
import { Sidenav, initTE } from 'tw-elements';

const SideMenu = () => {
  useEffect(() => {
    initTE({ Sidenav });
  }, []);

  return (
    <>
      <nav
        id="sidenav-1"
        className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 xl:data-[te-sidenav-hidden='false']:translate-x-0"
        data-te-sidenav-init
        data-te-sidenav-hidden="false"
        data-te-sidenav-mode-breakpoint-over="0"
        data-te-sidenav-mode-breakpoint-side="xl"
        //data-te-sidenav-content="#content"
        data-te-sidenav-accordion="true"
      >
        <CompanyLogo imgSrc={jnFirstLogo} companyNm="JF Groupware" />

        <ul className="relative m-0 list-none px-[0.2rem]" data-te-sidenav-menu-ref>
          {allMenuInfos.map((el, idx) => {
            const routeInfo: RouteInfo | undefined = getRouteInfo(el.firstMenu);

            return (
              <li key={routeInfo?.id} className="relative">
                <a
                  className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                  href="#!"
                  data-te-sidenav-link-ref
                >
                  <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-700 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                    <Image src={routeInfo?.img} alt={routeInfo?.title ?? ''} />
                  </span>
                  <span>{routeInfo?.title}</span>
                  <span
                    className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 dark:[&>svg]:fill-gray-300"
                    data-te-sidenav-rotate-icon-ref
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                  </span>
                </a>

                <ul className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block" data-te-sidenav-collapse-ref>
                  {el.secondMenu?.map((el2, idx2) => {
                    const subRouteInfo: RouteInfo | undefined = getRouteInfo(el2);

                    return (
                      <Link
                        key={el2}
                        href={`/${routeInfo?.id}/${subRouteInfo?.id}`}
                        className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.78rem] text-gray-700 outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10"
                        data-te-sidenav-link-ref
                      >
                        <li key={el2} className="relative">
                          {subRouteInfo?.title}
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default SideMenu;
