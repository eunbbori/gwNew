/* eslint-disable react/no-unknown-property */

import React from 'react';
import Image from 'next/image';
import jnFirstLogo from 'src/assets/img/jnfirst.png';
import laptopIcon from 'src/assets/svg/laptop.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import editIcon from 'src/assets/svg/edit.svg';
import team2Img from 'src/assets/img/team-2.jpg';
import spotifyLogo from 'src/assets/img/small-logos/logo-spotify.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faGear, faBell, faCheck } from '@fortawesome/free-solid-svg-icons';

const TestPage = () => {
  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default text-slate-500">
      {/* sidenav  */}
      <aside className="max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent">
        <div className="h-19.5">
          <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden" sidenav-close="true" />
          <a className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700" href="javascript:;" target="_blank" rel="noreferrer">
            <Image src={jnFirstLogo} className="inline w-10 h-full transition-all duration-200 ease-nav-brand max-h-8" alt="main_logo" />
            <span className="ml-1 font-semibold transition-all duration-200 ease-nav-brand">JF Groupware</span>
          </a>
        </div>
        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
        <div className="items-center block w-auto max-h-screen overflow-auto h-sidenav grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
            <li className="mt-0.5 w-full">
              <a
                className="py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors"
                href="./pages/dashboard.html"
              >
                <div className="bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                  <Image src={laptopIcon} alt="대시보드" />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">대시보드</span>
              </a>
            </li>
            <li className="mt-0.5 w-full">
              <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/tables.html">
                <div className="shadow-soft-2xl mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                  <Image src={userGroupIcon} alt="직원관리" />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">직원관리</span>
              </a>
            </li>
            <li className="mt-0.5 w-full">
              <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/billing.html">
                <div className="shadow-soft-2xl mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center fill-current stroke-0 text-center xl:p-2.5">
                  <Image src={flightIcon} alt="휴가관리" />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">휴가목록</span>
              </a>
            </li>
            <li className="mt-0.5 w-full">
              <a
                className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors"
                href="./pages/virtual-reality.html"
              >
                <div className="shadow-soft-2xl mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                  <Image src={alarmIcon} alt="근태관리" />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">근태관리</span>
              </a>
            </li>
            {/* li class="w-full mt-4">
      <h6 class="pl-6 ml-2 font-bold leading-tight uppercase text-xs opacity-60">Account pages</h6>
    </li */}
            <li className="mt-0.5 w-full">
              <a className="py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors" href="./pages/profile.html">
                <div className="shadow-soft-2xl mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                  <Image src={editIcon} alt="결제" />
                </div>
                <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">결제</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="mx-4">
          {/* load phantom colors for card after: */}
          <p className="invisible hidden text-gray-800 text-red-500 text-red-600 after:bg-gradient-to-tl after:from-gray-900 after:to-slate-800 after:from-blue-600 after:to-cyan-400 after:from-red-500 after:to-yellow-400 after:from-green-600 after:to-lime-400 after:from-red-600 after:to-rose-400 after:from-slate-600 after:to-slate-300 text-lime-500 text-cyan-500 text-slate-400 text-fuchsia-500" />
          <div
            className="after:opacity-65 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']"
            sidenav-card="true"
          >
            <div
              className="mb-7.5 absolute h-full w-full rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage: 'url("white-curved.jpeg")',
              }}
            />
            <div className="relative z-20 flex-auto w-full p-4 text-left text-white">
              <div className="flex items-center justify-center w-8 h-8 mb-4 text-center bg-white bg-center rounded-lg icon shadow-soft-2xl">
                <i
                  className="top-0 z-10 text-transparent ni leading-none ni-diamond text-lg bg-gradient-to-tl from-slate-600 to-slate-300 bg-clip-text opacity-80"
                  sidenav-card-icon="true"
                />
              </div>
              <div className="transition-all duration-200 ease-nav-brand">
                <h6 className="mb-0 text-white">구매 문의</h6>
                <p className="mt-0 mb-4 font-semibold leading-tight text-xs">www.jnfirst.co.kr</p>
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/"
                  target="_blank"
                  className="inline-block w-full px-8 py-2 mb-0 font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro text-xs hover:shadow-soft-2xl hover:scale-102"
                  rel="noreferrer"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
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
            <nav>
              {/* breadcrumb */}
              {/* ol class="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
        <li class="leading-normal text-sm">
          <a class="opacity-50 text-slate-700" href="javascript:;">Pages</a>
        </li>
        <li class="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">Dashboard</li>
      </ol */}
              <div className="shadow-soft-2xl mr-2 flex h-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                <Image src={alarmIcon} alt="근태관리" />
                <h6 className="inline mb-0 font-bold capitalize">근태관리</h6>
              </div>
            </nav>
            <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
              <div className="flex items-center md:ml-auto md:pr-4">
                <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                  <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </span>
                  <input
                    type="text"
                    className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                {/* online builder btn  */}
                {/* <li class="flex items-center">
          <a class="inline-block px-8 py-2 mb-0 mr-4 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro border-fuchsia-500 ease-soft-in text-xs hover:scale-102 active:shadow-soft-xs text-fuchsia-500 hover:border-fuchsia-500 active:bg-fuchsia-500 active:hover:text-fuchsia-500 hover:text-fuchsia-500 tracking-tight-soft hover:bg-transparent hover:opacity-75 hover:shadow-none active:text-white active:hover:bg-transparent" target="_blank" href="https://www.creative-tim.com/builder/soft-ui?ref=navbar-dashboard&amp;_ga=2.76518741.1192788655.1647724933-1242940210.1644448053">Online Builder</a>
        </li> */}
                <li className="flex items-center">
                  <a href="./pages/sign-in.html" className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500">
                    <FontAwesomeIcon className="sm:mr-1" icon={faUser} />
                    <span className="hidden sm:inline">로그인</span>
                  </a>
                </li>
                <li className="flex items-center pl-4 xl:hidden">
                  <a href="javascript:;" className="block p-0 transition-all ease-nav-brand text-sm text-slate-500" sidenav-trigger="true">
                    <div className="w-4.5 overflow-hidden">
                      <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                      <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                      <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all" />
                    </div>
                  </a>
                </li>
                <li className="flex items-center px-4">
                  <a href="javascript:;" className="p-0 transition-all text-sm ease-nav-brand text-slate-500">
                    {/* <i
                      fixed-plugin-button-nav
                      className="cursor-pointer fa fa-cog"
                    /> */}
                    <FontAwesomeIcon fixed-plugin-button-nav="true" className="cursor-pointer" icon={faGear} />
                    {/* fixed-plugin-button-nav  */}
                  </a>
                </li>
                {/* notifications */}
                <li className="relative flex items-center pr-2">
                  <p className="hidden transform-dropdown-show" />
                  <a
                    href="javascript:;"
                    className="block p-0 transition-all text-sm ease-nav-brand text-slate-500"
                    dropdown-trigger="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon className="cursor-pointer" icon={faBell} />
                  </a>
                  <ul
                    dropdown-menu="true"
                    className="text-sm transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease-soft lg:shadow-soft-3xl duration-250 min-w-44 before:sm:right-7.5 before:text-5.5 pointer-events-none absolute right-0 top-0 z-50 origin-top list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-6 lg:absolute lg:right-0 lg:left-auto lg:mt-2 lg:block lg:cursor-pointer"
                  >
                    {/* add show class on dropdown open js */}
                    <li className="relative mb-2">
                      <a
                        className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-4 duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors"
                        href="javascript:;"
                      >
                        <div className="flex py-1">
                          <div className="my-auto">
                            <Image
                              src={team2Img}
                              className="inline-flex items-center justify-center mr-4 text-white text-sm h-9 w-9 max-w-none rounded-xl"
                              alt={''}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-1 font-normal leading-normal text-sm">
                              <span className="font-semibold">New message</span> from Laur
                            </h6>
                            <p className="mb-0 leading-tight text-xs text-slate-400">
                              <i className="mr-1 fa fa-clock" />
                              13 minutes ago
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="relative mb-2">
                      <a
                        className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                        href="javascript:;"
                      >
                        <div className="flex py-1">
                          <div className="my-auto">
                            <Image
                              src={spotifyLogo}
                              className="inline-flex items-center justify-center mr-4 text-white text-sm bg-gradient-to-tl from-gray-900 to-slate-800 h-9 w-9 max-w-none rounded-xl"
                              alt={''}
                            />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-1 font-normal leading-normal text-sm">
                              <span className="font-semibold">New album</span> by Travis Scott
                            </h6>
                            <p className="mb-0 leading-tight text-xs text-slate-400">
                              <i className="mr-1 fa fa-clock" />1 day
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="relative">
                      <a
                        className="ease-soft py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                        href="javascript:;"
                      >
                        <div className="flex py-1">
                          <div className="inline-flex items-center justify-center my-auto mr-4 text-white transition-all duration-200 ease-nav-brand text-sm bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl">
                            <svg
                              width="12px"
                              height="12px"
                              viewBox="0 0 43 36"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                              <title>credit-card</title>
                              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero">
                                  <g transform="translate(1716.000000, 291.000000)">
                                    <g transform="translate(453.000000, 454.000000)">
                                      <path
                                        className="color-background"
                                        d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                        opacity="0.593633743"
                                      />
                                      <path
                                        className="color-background"
                                        d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center">
                            <h6 className="mb-1 font-normal leading-normal text-sm">Payment successfully completed</h6>
                            <p className="mb-0 leading-tight text-xs text-slate-400">
                              <i className="mr-1 fa fa-clock" />2 days
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* end Navbar */}
        {/* cards */}
        <div className="w-full px-6 py-6 mx-auto">
          {/* cards row 4 */}
          <div className="flex flex-wrap my-6 -mx-3">
            <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:flex-none lg:flex-none">
              <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
                  <div className="flex flex-wrap mt-0 -mx-3">
                    <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
                      <h6>2023-05-02 (화)</h6>
                      <p className="mb-0 leading-normal text-sm">
                        <FontAwesomeIcon className="text-cyan-500" icon={faCheck} />
                        전체 <span className="ml-1 font-semibold">15</span> 명
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-auto p-6 px-0 pb-2">
                  <div className="overflow-x-auto">
                    <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                      <thead className="align-bottom">
                        <tr>
                          <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            이름
                          </th>
                          <th className="px-6 py-3 pl-2 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            근무시간
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            근태
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            출근
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            퇴근
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            연장근무
                          </th>
                          <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                            야간근무
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">홍길동</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">08:00</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 출근 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 09:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 06:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">손흥민</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">07:30</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 지각 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 09:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 06:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">마이클 잭슨</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">06:00</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 출근 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 09:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 06:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">임꺽정</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">08:00</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 지각 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 09:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 06:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">BTS</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">-</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 연차 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 09:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 06:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">이순신</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                            <div className="flex px-2 py-1">
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-0 leading-normal text-sm">10:00</h6>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-0 text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 출근 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 09:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> 06:10 </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap">
                            <span className="font-semibold leading-tight text-xs"> - </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="pt-4">
            <div className="w-full px-6 mx-auto">
              <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
                <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
                  <div className="leading-normal text-center text-sm text-slate-500 lg:text-left">
                    © made by
                    <a href="https://www.creative-tim.com" className="font-semibold text-slate-700" target="_blank" rel="noreferrer">
                      J&amp;First
                    </a>
                    company.
                  </div>
                </div>
                <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
                  <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
                    <li className="nav-item">
                      <a
                        href="https://www.creative-tim.com"
                        className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        회사 소개
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="https://www.creative-tim.com/presentation"
                        className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="https://creative-tim.com/blog"
                        className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        구매문의
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="https://www.creative-tim.com/license"
                        className="block px-4 pt-0 pb-1 pr-0 font-normal transition-colors ease-soft-in-out text-sm text-slate-500"
                        target="_blank"
                        rel="noreferrer"
                      >
                        요금제
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
        {/* end cards */}
      </main>
    </div>
  );
};

export default TestPage;
