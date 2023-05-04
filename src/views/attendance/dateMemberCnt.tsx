import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export interface IDateMemberCntProps {
  dt: Date;
  cnt: number;
}

export default function DateMemberCnt({ dt, cnt }: IDateMemberCntProps) {
  const year = dt.getFullYear();
  const month = dt.getMonth() + 1;
  const sMonth = month >= 10 ? month : '0' + month;
  const date = dt.getDate();
  const sDate = date >= 10 ? date : '0' + date;
  const day = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
      <h6>
        {year + '-' + sMonth + '-' + sDate} ({day[dt.getDay()]})
      </h6>
      <p className="mb-0 leading-normal text-sm">
        <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
      </p>
    </div>
  );
}
