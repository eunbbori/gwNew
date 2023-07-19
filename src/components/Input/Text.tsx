import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

interface OtherOptions {
  title: string;
  value: string;
  inputClassName: string;
  paragraphClassName: string;
}

const Text = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: OtherOptions) => {
  return (
    <>
      <p className={props.paragraphClassName}>{props.title}</p>
      <input disabled className={props.inputClassName} value={props.value} />
    </>
  );
};

export default Text;
