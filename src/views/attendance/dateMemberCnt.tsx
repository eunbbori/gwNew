import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { weekdaysKo, toDateFormat } from '@/utils/toDateFormat';
import { useReactiveVar } from '@apollo/client';
import attendanceDate from '@/modules/attendance';

export interface IDateMemberCntProps {
  cnt: number | undefined;
  selectedDate?: Date;
  setSelectedDate?: Dispatch<SetStateAction<Date>>;
}

const DateMemberCnt = ({ cnt }: IDateMemberCntProps) => {
  const selectedAttendanceDate = useReactiveVar(attendanceDate);

  const dateChangeHandler = (date: Date) => {
    attendanceDate(date);
    console.log('pickDate', toDateFormat(selectedAttendanceDate!));
  };

  return (
    <>
      <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <p className="mb-0 leading-normal text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
      </div>
      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <div>
          <DatePicker
            dateFormat={`yyyy-MM-dd (${weekdaysKo[selectedAttendanceDate.getDay()]})`}
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            shouldCloseOnSelect
            selected={selectedAttendanceDate}
            onChange={dateChangeHandler}
            showIcon
          />
        </div>
      </div>
    </>
  );
};

export default DateMemberCnt;
