import { useController } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect } from 'react';

interface OtherOptions {
  name: string;
  title: string;
  defaultValue?: string;
}

const DatePickerInput = (props: OtherOptions) => {
  const { field, formState } = useController({ name: props.name });
  const defaultValue = props.defaultValue ?? format(new Date(), 'yyyy-MM-dd');

  const handleDatePickerChange = (selectedDate: Date) => {
    field.onChange(selectedDate);
  };

  useEffect(() => {
    field.onChange(defaultValue);
  }, []);

  return (
    <>
      <p className="text-sm text-[#484848]">{props.title}</p>
      <DatePicker
        name={props.name}
        value={field.value}
        minDate={new Date('2000-01-01')}
        // maxDate={new Date()}
        shouldCloseOnSelect
        selected={field.value ? new Date(field.value) : defaultValue ? new Date(defaultValue) : new Date()}
        onChange={handleDatePickerChange}
        customInput={
          <button type="button">
            <span className="pl-[4.25rem]">
              {format(field.value ? new Date(field.value) : defaultValue ? new Date(defaultValue) : new Date(), 'yyyy-MM-dd (cccccc)', {
                locale: ko,
              })}
            </span>
          </button>
        }
        showIcon
      />
    </>
  );
};

export default DatePickerInput;
