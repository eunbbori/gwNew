import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { ko } from 'date-fns/locale';
import { attendanceDateVar } from '@/stores/gqlReactVars';
import AttendanceFilterGroup from '@/components/Attendance/AttendanceFilterGroup';

export interface IDateMemberCntProps {
  cnt: number | undefined;
}

const DateMemberCnt = ({ cnt }: IDateMemberCntProps) => {
  const selectedAttendanceDate = useReactiveVar(attendanceDateVar);

  const dateChangeHandler = (date: Date) => {
    attendanceDateVar(date);
  };

  return (
    <>
      <div className="flex w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <p className="mb-0 mr-5 w-30 leading-8 text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
      </div>

      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <AttendanceFilterGroup />
        <div className="px-5">
          <DatePicker
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            shouldCloseOnSelect
            selected={selectedAttendanceDate}
            onChange={dateChangeHandler}
            customInput={
              <button>
                <span className="pl-[4.25rem]">{format(selectedAttendanceDate, 'yyyy-MM-dd (cccccc)', { locale: ko })}</span>
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
