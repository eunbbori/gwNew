import Datepicker from 'react-tailwindcss-datepicker';
import { useController } from 'react-hook-form';

interface IDatePickerRangeInput {
  name: string;
  title: string;
  defaultValue: {
    startDate: Date;
    endDate: Date;
  };
}
const DatePickerRangeInput = (props: IDatePickerRangeInput) => {
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
