import React, { useState } from 'react';
/* eslint-disable react/no-unknown-property */

import { signOut, useSession } from 'next-auth/react';

const AttendanceBtnGroup = () => {
  const { data: session, status } = useSession();
  const [workState, setWorkState] = useState(false);
  const workBtnClass =
    'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';
  const workBtnDisabledClass = 'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 bg-red-300';

  const workBtnHandler = () => {
    const clickedStartAt = Date();
    setWorkState(true);
    console.log('work!', clickedStartAt);
  };
  const offBtnHandler = () => {
    const clickedEndAt = Date();
    setWorkState(false);
    console.log('off!');
  };
  return (
    <ul className="flex">
      {status === 'authenticated' && session.user?.email === 'ironman@jnfirst.com' ? (
        <>
          <li className="flex items-center">
            <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500 ml-6">
              {workState === true ? (
                <button className={`${workBtnDisabledClass}`} disabled onClick={workBtnHandler}>
                  출근
                </button>
              ) : (
                <button className={`${workBtnClass}`} onClick={workBtnHandler}>
                  출근
                </button>
              )}
            </div>
          </li>
          <li className="flex items-center">
            <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500 ml-6">
              <button
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={offBtnHandler}
              >
                퇴근
              </button>
            </div>
          </li>
        </>
      ) : (
        ''
      )}
    </ul>
  );
};

export default AttendanceBtnGroup;
