import Datepicker from 'react-tailwindcss-datepicker';
import { useController, UseControllerProps, FieldPath, FieldValues } from 'react-hook-form';

const DatePickerRangeInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & { title: string },
) => {
  const { field } = useController(props);

  return (
    <div className="flex">
      <p className="text-sm font-bold text-[#484848] self-center mr-5">{props.title}</p>
      <Datepicker
        inputName={props.name}
        containerClassName="relative text-gray-700 w-[250px]"
        value={field.value}
        onChange={field.onChange}
        displayFormat={'YYYY-MM-DD'}
        showShortcuts={true}
        placeholder={'Select Date'}
        primaryColor={'cyan'}
        showFooter={true}
        popoverDirection="down"
      />
    </div>
  );
};

export default DatePickerRangeInput;
