import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { ForwardedRef, forwardRef } from 'react';

interface OtherOptions {
  title: string;
  placeHolder: string;
  type: string;
  inputClassName: string;
  paragraphClassName: string;
  divClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = forwardRef(function textInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: UseControllerProps<TFieldValues, TName> & OtherOptions, ref: ForwardedRef<HTMLInputElement>) {
  const { field } = useController(props);

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
          value={field.value ?? props.defaultValue}
          ref={ref}
          onChange={field.onChange}
        />
      </div>
    </>
  );
});

export default TextInput;
