import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import { attendanceDateVar } from '@/stores/gqlReactVars';
import { useState } from 'react';
import DatePickerRangeInput from '@/components/Input/DatePickerRangeInput';

export interface IDateMemberCntProps {
  cnt: number | undefined;
}

const ConditionalFilterPart = ({ cnt }: IDateMemberCntProps) => {
  const selectedAttendanceDate = useReactiveVar(attendanceDateVar);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  return (
    <>
      <div className="flex w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
        <p className="mb-0 mr-5 w-30 leading-8 text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
        <DatePickerRangeInput name={'dateRange'} title={'기간'} />
      </div>
    </>
  );
};

export default ConditionalFilterPart;
