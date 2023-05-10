import { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export interface IDateMemberCntProps {
  dt: Date;
  cnt: number;
}
const options = {
  title: '근태날짜',
  autoHide: false,
  todayBtn: true,
  clearBtn: true,
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-gray-700 dark:bg-gray-800',
    todayBtn: '',
    clearBtn: '',
    icons: '',
    text: 'text-white',
    disabledText: 'text-gray-600',
    input: '',
    inputIcon: '',
    selected: '',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <span>
        <AiOutlineArrowLeft />
      </span>
    ),
    next: () => (
      <span>
        <AiOutlineArrowRight />
      </span>
    ),
  },
  datepickerClassNames: 'top-12',
  defaultDate: new Date(),
  language: 'en',
};

const DateMemberCnt = ({ dt, cnt }: IDateMemberCntProps) => {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const sMonth = month >= 10 ? month : '0' + month;
  const date = dt.getDate();
  const sDate = date >= 10 ? date : '0' + date;
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const [show, setShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const handleChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };
  const dateClickHandler = () => {
    console.log('selectedDate', selectedDate);
  };

  return (
    <>
      <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <h6>
          {year + '-' + sMonth + '-' + sDate} ({day[dt.getDay()]})
        </h6>
        <p className="mb-0 leading-normal text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
      </div>
      <div className="justify-end flex w-7/12 max-w-full px-3 mt-0 -right-0 lg:w-1/2">
        <div>
          <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} value={selectedDate} />
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
