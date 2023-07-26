import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { forwardRef } from 'react';
import { ref } from 'yup';

interface OtherOptions {
  title: string;
  placeHolder: string;
  type: string;
  inputClassName: string;
  paragraphClassName: string;
  divClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  ref?: React.RefObject<HTMLInputElement>;
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
          // ref={props.ref}
          // onChange={props.onChange}
        />
      </div>
    </>
  );
};

export default TextInput;
