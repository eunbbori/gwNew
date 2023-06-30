import { useController, UseControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import Datepicker from 'react-tailwindcss-datepicker';
import { useState } from 'react';

const DatePickerRangeInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & { title: string },
) => {
  // const { field, fieldState } = useController(props);
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
      <p className="text-sm text-[#484848]">{props.title}</p>
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
    </>
  );
};

export default DatePickerRangeInput;
