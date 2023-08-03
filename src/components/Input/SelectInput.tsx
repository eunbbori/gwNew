import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { useController } from 'react-hook-form';
import Select from 'react-select';

interface IOption {
  value: string;
  label: string;
}

interface OtherOptions {
  name: string;
  selectOptions: any;
  title: string;
  placeHolder: string;
  optional?: boolean;

  paragraphClassName: string;
  divClassName?: string;
}

const SelectInput = (props: OtherOptions) => {
  const { field, formState } = useController({ name: props.name });
  const SelectOptions = props.selectOptions;
  const handleSelectChange = (selectedOption: IOption | null) => {
    const value = selectedOption ? selectedOption.value : '';
    field.onChange(value);
  };

  const currSelectOption = useMemo(() => {
    const defaultValue = formState.defaultValues ? formState.defaultValues[props.name] : '';

    return field.value
      ? props.selectOptions.find((c: IOption) => c.value == field.value)
      : defaultValue
      ? props.selectOptions.find((c: IOption) => c.value == defaultValue)
      : null;
  }, [field.value, formState.defaultValues, props.selectOptions]);
  return (
    <>
      <div className={props.divClassName}>
        <p className={props.paragraphClassName}>
          {props.title}
          {!props.optional ? <FontAwesomeIcon className={'ml-1 text-sm font-bold text-rose-500'} icon={faAsterisk} /> : ''}
        </p>
        <Select
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '14px',
            }),
            option: (styles) => {
              return {
                ...styles,
                fontSize: '14px',
              };
            },
          }}
          name={props.name}
          options={SelectOptions}
          placeholder={props.placeHolder}
          value={currSelectOption}
          onChange={handleSelectChange}
          className="w-full mr-5"
        />
      </div>
    </>
  );
};

export default SelectInput;
