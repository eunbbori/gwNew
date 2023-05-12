import { Dispatch, SetStateAction, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { weekdaysKo, toDateFormat } from '@/utils/toDateFormat';
// import { ko } from 'date-fns/esm/locale';

export interface IDateMemberCntProps {
  cnt: number | undefined;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

const DateMemberCnt = ({ cnt, selectedDate, setSelectedDate }: IDateMemberCntProps) => {
  const [pickDate, setPickDate] = useState<Date>(new Date());

  const dateClickHandler = () => {
    console.log('pickDate', toDateFormat(pickDate!));
    setSelectedDate(pickDate);
  };
  // const dateChangeHandler = (date: Date) => {
  //   setPickDate(date);
  //   setSelectedDate(pickDate);
  //   console.log('pickDate', toDateFormat(pickDate!));
  // };

  return (
    <>
      <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <h6>{toDateFormat(selectedDate)}</h6>
        <p className="mb-0 leading-normal text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
      </div>
      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <div>
          <DatePicker
            dateFormat={`yyyy-MM-dd (${weekdaysKo[pickDate.getDay()]})`}
            minDate={new Date('2000-01-01')}
            maxDate={new Date()}
            shouldCloseOnSelect
            selected={pickDate}
            onChange={(date: Date) => setPickDate(date)}
            // onChange={dateChangeHandler}
            showIcon
          />
        </div>
        <button
          onClick={dateClickHandler}
          className="ml-2 h-10 px-6 float-right font-semibold rounded-md border hover:bg-gray-100 hover:border-slate-400 border-slate-200 text-slate-800"
          type="button"
        >
          조회
        </button>
      </div>
    </>
  );
};

export default DateMemberCnt;
