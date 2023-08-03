import { useController } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

interface OtherOptions {
  name: string;
  title: string;
  optional?: boolean;
}

const DatePickerInput = (props: OtherOptions) => {
  const { field, formState } = useController({ name: props.name });
  const defaultValue = formState.defaultValues?.startDate ?? format(new Date(), 'yyyy-MM-dd');

  const handleDatePickerChange = (selectedDate: Date) => {
    field.onChange(selectedDate);
  };

  useEffect(() => {
    field.onChange(defaultValue);
  }, []);

  return (
    <>
      <p className="text-sm text-[#484848]">
        {props.title}
        {!props.optional ? <FontAwesomeIcon className={'ml-1 text-sm font-bold text-rose-500'} icon={faAsterisk} /> : ''}
      </p>
      <DatePicker
        name={props.name}
        value={field.value ?? defaultValue}
        minDate={new Date('2000-01-01')}
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
