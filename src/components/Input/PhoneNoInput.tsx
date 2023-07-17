import { IEmployeeFormValues } from '@/views/admin/AddEmployee';
import { useEffect } from 'react';
import { Controller, FieldPath, FieldValues, UseControllerProps, UseFormSetValue, useController } from 'react-hook-form';

interface OtherOptions {
  title: string;
  value?: string;
  placeHolder: string;
  inputClassName: string;
}

const PhoneNoInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  const formatPhoneNo = (phoneNo: string) => {
    const phoneLength = phoneNo.length ?? 0;
    if (phoneLength < 4) return phoneNo;
    else if (phoneLength < 7) return phoneNo.replace(/(\d{3})(\d)/, '$1-$2');
    else if (phoneLength < 11) return phoneNo.replace(/(\d{3})(\d{3})(\d)/, '$1-$2-$3');
    else return phoneNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

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
              console.log('onChangeeeeeeeeeeee');
              const phoneNo = target.value.trim().replace(/\D/g, '');
              onChange(phoneNo);

              target.value = formatPhoneNo(phoneNo);
            }}
            type="text"
            defaultValue={formatPhoneNo(props.defaultValue ?? '')}
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
