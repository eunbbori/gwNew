import { attendanceTimeVar, jwtTokensVar, offTimeVar } from '@/modules/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import React, { useState } from 'react';
/* eslint-disable react/no-unknown-property */

const AttendanceBtnGroup = () => {
  const tokens = useReactiveVar(jwtTokensVar);
  const [attendanceState, setAttendanceState] = useState(false);
  const workStartTime = useReactiveVar(attendanceTimeVar);
  const basicAttendBtnClass =
    'self-center h-[35px] inline-block w-full px-4 mb-2 text-xs font-bold text-center text-white uppercase align-middle transition-all border border-transparent border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500';
  const basicFinishBtnClass =
    'self-center h-[35px] inline-block w-full px-4 mb-2 ml-2 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500';

  const handleAttendanceBtn = () => {
    setAttendanceState(true);
    attendanceTimeVar(new Date());
  };
  const handleFinishBtn = () => {
    setAttendanceState(false);
  };
  sessionStorage.setItem('attendanceState', JSON.stringify(attendanceState));
  sessionStorage.setItem('attendanceTime', JSON.stringify(workStartTime));

  return (
    <ul className="flex mr-8 mt-[-10px]">
      <>
        <li className="flex items-center">
          <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500 ml-6">
            {tokens.accessToken ? (
              <div className="flex mt-[5px]">
                <button className={`${attendanceState ? `${basicAttendBtnClass}` : `${basicFinishBtnClass}`}`} onClick={handleAttendanceBtn}>
                  출근
                </button>
                <button className={`${!attendanceState ? `${basicAttendBtnClass}` : `${basicFinishBtnClass}`}`} onClick={handleFinishBtn}>
                  퇴근
                </button>
              </div>
            ) : (
              ''
            )}
          </div>
        </li>
      </>
    </ul>
  );
};

export default AttendanceBtnGroup;
