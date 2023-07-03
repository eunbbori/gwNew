import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';
import { attendanceConditionalFilterDateVar } from '@/stores/gqlReactVars';

const DatePickerRangeInput = (props: { name: string; title: string }) => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  attendanceConditionalFilterDateVar(selectedDate);

  const handleValueChange = (newValue: any) => {
    setSelectedDate(newValue);
  };

  return (
    <div className="flex">
      <p className="text-sm font-bold text-[#484848] self-center mr-5">{props.title}</p>
      <Datepicker
        containerClassName="relative text-gray-700 w-[250px]"
        value={selectedDate}
        onChange={handleValueChange}
        displayFormat={'YYYY-MM-DD'}
        showShortcuts={true}
        placeholder={'Select Date'}
        primaryColor={'cyan'}
        showFooter={true}
      />
    </div>
  );
};

export default DatePickerRangeInput;
