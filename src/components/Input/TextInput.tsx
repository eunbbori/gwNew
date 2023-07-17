import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface OtherOptions {
  title: string;
  placeHolder: string;
  type: string;
  inputClassName: string;
  paragraphClassName: string;
  divClassName?: string;
}

const TextInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  const { field } = useController(props);

  const defaultValueOption = field.value ? field.value : props.defaultValue;

  return (
    <>
      <div className={props.divClassName}>
        <p className={props.paragraphClassName}>{props.title}</p>
        <input
          {...field}
          name={props.name}
          placeholder={props.placeHolder}
          type={props.type}
          className={props.inputClassName}
          aria-label={props.name}
          aria-describedby={props.name + '-addon'}
          value={defaultValueOption}
        />
      </div>
    </>
  );
};

export default TextInput;
