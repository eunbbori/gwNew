import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface OtherOptions {
  title: string;
  placeHolder: string;
  type: string;
  inputClassName: string;
}

const TextInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  const { field } = useController(props);

  return (
    <>
      <p className="text-sm text-[#484848] w-[300px]">{props.title}</p>
      <input
        name={props.name}
        placeholder={props.placeHolder}
        type={props.type}
        className={props.inputClassName}
        aria-label={props.name}
        aria-describedby={props.name + '-addon'}
      />
    </>
  );
};

export default TextInput;
