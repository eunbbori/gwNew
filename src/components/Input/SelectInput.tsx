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
      ? props.selectOptions.find((c: IOption) => c.value === field.value)
      : defaultValue
      ? props.selectOptions.find((c: IOption) => c.value === defaultValue)
      : null;
  }, [field.value, formState.defaultValues, props.selectOptions]);

  return (
    <>
      <div className={props.divClassName}>
        <p className={props.paragraphClassName}>{props.title}</p>
        <Select
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
