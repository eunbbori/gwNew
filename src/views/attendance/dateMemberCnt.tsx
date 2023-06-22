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
import AttendanceFilterGroup from '@/components/Attendance/AttendanceFilterGroup';

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

  return (
    <>
      <div className="flex w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <p className="mb-0 leading-normal text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
      </div>
      <AttendanceFilterGroup />

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
