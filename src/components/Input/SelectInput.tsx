import React from 'react';
import { FieldPath, FieldValues, PathValue, UseControllerProps, useController } from 'react-hook-form';
import Select, { GroupBase } from 'react-select';

interface IOption {
  value: string;
  label: string;
}

interface OtherOptions {
  selectOptions: any;
  title: string;
  placeHolder: string;
  paragraphClassName: string;
  divClassName?: string;
}

const SelectInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  const { field } = useController(props);
  const SelectOptions = props.selectOptions as unknown as readonly (PathValue<TFieldValues, TName> | GroupBase<PathValue<TFieldValues, TName>>)[];
  const handleSelectChange = (selectedOption: IOption | null) => {
    const value = selectedOption ? selectedOption.value : '';
    field.onChange(value);
  };

  const defaultValueOption = field.value
    ? props.selectOptions.find((c: IOption) => c.value === field.value)
    : props.defaultValue
    ? props.selectOptions.find((c: IOption) => c.value === props.defaultValue)
    : null;

  return (
    <>
      <div className={props.divClassName}>
        <p className={props.paragraphClassName}>{props.title}</p>
        <Select
          name={props.name}
          options={SelectOptions}
          placeholder={props.placeHolder}
          value={defaultValueOption}
          onChange={handleSelectChange}
          className="w-full mr-5"
        />
      </div>
    </>
  );
};

export default SelectInput;
