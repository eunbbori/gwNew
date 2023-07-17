import { useController, UseControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';

const DatePickerInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & { title: string },
) => {
  const { field } = useController(props);

  const handleDatePickerChange = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString();
    field.onChange(formattedDate);
  };

  return (
    <>
      <p className="text-sm text-[#484848]">{props.title}</p>
      <DatePicker
        name={props.name}
        value={field.value}
        minDate={new Date('2000-01-01')}
        maxDate={new Date()}
        shouldCloseOnSelect
        selected={field.value ? new Date(field.value) : props.defaultValue ? new Date(props.defaultValue) : new Date()}
        onChange={handleDatePickerChange}
        customInput={
          <button>
            <span className="pl-[4.25rem]">
              {format(field.value ? new Date(field.value) : props.defaultValue ? new Date(props.defaultValue) : new Date(), 'yyyy-MM-dd (cccccc)', {
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
