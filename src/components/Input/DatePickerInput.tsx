import { useController, UseControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const DatePickerInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & { title: string },
) => {
  const { field } = useController(props);

  return (
    <>
      <p className="text-sm text-[#484848]">{props.title}</p>
      <DatePicker
        name={props.name}
        value={field.value}
        minDate={new Date('2000-01-01')}
        maxDate={new Date()}
        shouldCloseOnSelect
        selected={field.value}
        onChange={field.onChange}
        customInput={
          <button>
            <span className="pl-[4.25rem]">{field.value && format(field.value, 'yyyy-MM-dd (cccccc)', { locale: ko })}</span>
          </button>
        }
        showIcon
      />
    </>
  );
};

export default DatePickerInput;
