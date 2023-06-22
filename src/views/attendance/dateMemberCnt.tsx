import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { ko } from 'date-fns/locale';
import { attendanceDateVar } from '@/stores/gqlReactVars';
import { useGetAllEmployeeQuery } from '@/types/generated/types';
import { SortColAttendance } from './Attendance';
import AttendanceFilterGroup from '@/components/Attendance/AttendanceFilterGroup';

export interface IDateMemberCntProps {
  cnt: number | undefined;
  selectedDate?: Date;
  setSortCol: Dispatch<SetStateAction<SortColAttendance>>;
  sortCol: SortColAttendance;
}

const DateMemberCnt = ({ cnt, setSortCol, sortCol }: IDateMemberCntProps) => {
  const selectedAttendanceDate = useReactiveVar(attendanceDateVar);

  const { data } = useGetAllEmployeeQuery();

  const dateChangeHandler = (date: Date) => {
    attendanceDateVar(date);
  };

  const onClickName = () => {
    setSortCol('name');
  };

  const onClickStartAt = () => {
    setSortCol('startAt');
  };

  return (
    <>
      <div className="flex w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <p className="mb-0 mr-5 w-30 leading-8 text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
        <p className="mb-0 leading-normal text-sm">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={onClickName}
              className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-900 rounded-l-lg bg-transparent border border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <FontAwesomeIcon className={(sortCol === 'name' ? 'text-cyan-500' : 'text-zinc-400') + ' mr-1'} icon={faCheck} /> 이름순
            </button>
            <button
              type="button"
              onClick={onClickStartAt}
              className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-900 rounded-r-md bg-transparent border border-l-0 border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            >
              <FontAwesomeIcon className={(sortCol === 'startAt' ? 'text-cyan-500' : 'text-zinc-400') + ' mr-1'} icon={faCheck} />
              출근순
            </button>
          </div>
        </p>
      </div>

      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <AttendanceFilterGroup />
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
