import { offTimeVar } from '@/modules/gplReactVars';
import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
/* eslint-disable react/no-unknown-property */

const AttendanceBtnGroup = () => {
  const [workState, setWorkState] = useState(true);
  const RecordedOffTime = useReactiveVar(offTimeVar);

  const offBtnClass =
    'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';
  const offBtnDisabledClass = 'py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 rounded-lg border border-gray-200 bg-red-400';
  const offBtnHandler = () => {
    offTimeVar(new Date());
    setWorkState(false);
    console.log('off!');
  };

  return (
    <ul className="flex mr-8">
      <>
        <li className="flex items-center">
          <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500 ml-6">
            {workState !== true ? (
              <button className={`${offBtnDisabledClass}`} disabled onClick={offBtnHandler}>
                퇴근
              </button>
            ) : (
              <button className={`${offBtnClass}`} onClick={offBtnHandler}>
                퇴근
              </button>
            )}
          </div>
        </li>
      </>
    </ul>
  );
};

export default AttendanceBtnGroup;
