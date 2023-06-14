import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { ko } from 'date-fns/locale';
import { attendanceDateVar } from '@/stores/gqlReactVars';
import { useGetAllEmployeeQuery } from '@/types/generated/types';
import { Ripple, Dropdown, initTE } from 'tw-elements';

export interface IDateMemberCntProps {
  cnt: number | undefined;
  selectedDate?: Date;
  setSelectedDate?: Dispatch<SetStateAction<Date>>;
}

const DateMemberCnt = ({ cnt }: IDateMemberCntProps) => {
  const selectedAttendanceDate = useReactiveVar(attendanceDateVar);

  const { data } = useGetAllEmployeeQuery();

  const dateChangeHandler = (date: Date) => {
    attendanceDateVar(date);
  };

  useEffect(() => {
    initTE({ Ripple, Dropdown });
  }, []);

  return (
    <>
      <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <p className="mb-0 leading-normal text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>

        <div className="relative" data-te-dropdown-ref>
          <button
            className="flex items-center whitespace-nowrap rounded bg-primary px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
            type="button"
            id="dropdownMenuSmallButton"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            전체
            <span className="ml-2 w-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <ul
            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuSmallButton"
            data-te-dropdown-menu-ref
          >
            {data?.employees?.map((emp, idx) => (
              <li key={idx}>
                <a
                  className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                  href="#"
                  data-te-dropdown-item-ref
                >
                  {emp?.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <div>
          <DatePicker
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            shouldCloseOnSelect
            selected={selectedAttendanceDate}
            onChange={dateChangeHandler}
            customInput={
              <button>
                <span className="pl-9">{format(selectedAttendanceDate, 'yyyy-MM-dd (cccccc)', { locale: ko })}</span>
              </button>
            }
            showIcon
          />
        </div>
      </div>
    </>
  );
};

export default DateMemberCnt;
