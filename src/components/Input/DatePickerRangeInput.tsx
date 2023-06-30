import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';

const DatePickerRangeInput = (props: { name: string; title: string }) => {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleValueChange = (newValue: any) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  return (
    <div className="flex">
      <p className="text-sm font-bold text-[#484848] self-center mr-5">{props.title}</p>
      <Datepicker
        containerClassName="relative text-gray-700 w-[250px]"
        value={value}
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
