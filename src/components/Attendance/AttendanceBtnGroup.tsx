import { startEndAtVar, jwtTokensVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { useGoToWorkMutation, useLeaveWorkMutation } from '@/types/generated/types';
/* eslint-disable react/no-unknown-property */

const AttendanceBtnGroup = () => {
  const tokens = useReactiveVar(jwtTokensVar);
  const startEndAt = useReactiveVar(startEndAtVar);

  const [goToWorkMutation] = useGoToWorkMutation();
  const [leaveWorkMutation] = useLeaveWorkMutation();

  const basicAttendBtnClass =
    'self-center mr-[15px] h-[35px] inline-block w-full px-4 mb-0 text-xs font-bold text-center text-white uppercase align-middle transition-all border border-transparent border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500';
  const basicFinishBtnClass =
    'self-center mr-[15px] h-[35px] inline-block w-full px-4 mb-0 text-xs font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500';

  const handleAttendanceBtn = () => {
    if (!startEndAt.startAt) {
      goToWorkMutation({
        onCompleted: (data) => {
          data?.goToWork && startEndAtVar({ ...startEndAt, startAt: data.goToWork.startAt });
        },
      });
    } else {
      leaveWorkMutation({
        onCompleted: (data) => {
          data?.leaveWork && startEndAtVar({ ...startEndAt, endAt: data.leaveWork.endAt });
        },
      });
    }
  };

  //const btnClass = startEndAt.startAt ? `${basicAttendBtnClass}`

  return (
    <ul className="flex mr-8 mt-[-10px]">
      <>
        <li className="flex items-center">
          <div className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500 ml-6">
            {tokens.accessToken && (
              <div className="flex mt-[5px]">
                <button className={`${startEndAt.startAt ? basicAttendBtnClass : basicFinishBtnClass}`} onClick={handleAttendanceBtn}>
                  {!startEndAt.startAt ? '출근' : '퇴근'}
                </button>
              </div>
            )}
          </div>
        </li>
      </>
    </ul>
  );
};

export default AttendanceBtnGroup;
