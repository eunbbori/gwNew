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
}

const SelectInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  const { field } = useController(props);
  const SelectOptions = props.selectOptions as readonly (PathValue<TFieldValues, TName> | GroupBase<PathValue<TFieldValues, TName>>)[];
  const handleSelectChange = (selectedOption: IOption | null) => {
    const value = selectedOption ? selectedOption.value : '';
    field.onChange(value);
  };
  return (
    <>
      <p className="text-sm text-[#484848]">{props.title}</p>
      <Select
        name={props.name}
        options={SelectOptions}
        placeholder={props.placeHolder}
        value={props.selectOptions.find((c: IOption) => c.value === field.value)}
        onChange={handleSelectChange}
      />
    </>
  );
};

export default SelectInput;
