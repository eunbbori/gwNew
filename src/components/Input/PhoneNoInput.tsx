import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';

interface OtherOptions {
  title: string;
  placeHolder: string;
  inputClassName: string;
}

const PhoneNoInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  return (
    <>
      <p className="text-sm text-[#484848]">{props.title}</p>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { value, onChange, ...field } }) => (
          <input
            {...field}
            onChange={({ target }) => {
              const phoneNo = target.value.trim().replace(/[^0-9]/g, '');
              onChange(phoneNo);

              const dashedPhoneNo =
                phoneNo.length < 4
                  ? phoneNo
                  : phoneNo.length < 7
                  ? phoneNo.replace(/(\d{3})(\d{1})/, '$1-$2')
                  : phoneNo.length < 11
                  ? phoneNo.replace(/(\d{3})(\d{3})(\d{1})/, '$1-$2-$3')
                  : phoneNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

              console.log('onChange: ' + phoneNo);
              target.value = dashedPhoneNo;
            }}
            type="text"
            placeholder={props.placeHolder}
            className={props.inputClassName}
            aria-label={props.name}
            aria-describedby={props.name + '-addon'}
          />
        )}
      />
    </>
  );
};

export default PhoneNoInput;
