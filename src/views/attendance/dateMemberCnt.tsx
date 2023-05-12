import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { toDateFormat } from '@/utils/toDateFormat';
import { useReactiveVar } from '@apollo/client';
import attendanceDate from '@/modules/attendance';
// import { ko } from 'date-fns/esm/locale';

export interface IDateMemberCntProps {
  dt?: Date;
  cnt: number;
}

const DateMemberCnt = ({ cnt }: IDateMemberCntProps) => {
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const selectedAttendanceDate = useReactiveVar(attendanceDate);
  // const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const dateClickHandler = () => {
    console.log('selectedDate', selectedAttendanceDate!);
  };
  const selectedDay = day[selectedAttendanceDate!.getDay()];
  return (
    <>
      <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <h6>
          {toDateFormat(selectedAttendanceDate)} ({day[selectedAttendanceDate.getDay()]})
        </h6>
        <p className="mb-0 leading-normal text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
      </div>
      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <div>
          <DatePicker
            dateFormat={`yyyy-MM-dd (${selectedDay})`}
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            shouldCloseOnSelect
            selected={selectedAttendanceDate}
            onChange={(date: Date) => attendanceDate(date)}
            showIcon
          />
        </div>
        <button
          onClick={dateClickHandler}
          className="ml-2 h-11 px-6 float-right font-semibold rounded-md border hover:bg-gray-100 hover:border-slate-400 border-slate-200 text-slate-800"
          type="button"
        >
          조회
        </button>
      </div>
    </>
  );
};

export default DateMemberCnt;
