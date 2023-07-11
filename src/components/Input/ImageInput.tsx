import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';
import { BsCamera } from 'react-icons/bs';

interface OtherOptions {
  id: string;
  title: string;
  type: string;
  accept?: string;
  inputClassName: string;
  paragraphClassName: string;
  divClassName?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const ImageInput = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & OtherOptions,
) => {
  const { field } = useController(props);

  return (
    <>
      <div className={props.divClassName}>
        <p className={props.paragraphClassName}>{props.title}</p>
        <input
          {...field}
          name={props.name}
          id={props.id}
          type={props.type}
          accept={props.accept}
          ref={props.ref}
          onChange={props.onChange}
          className={props.inputClassName}
          style={{ display: 'none' }}
          aria-label={props.name}
          aria-describedby={props.name + '-addon'}
        />
      </div>
    </>
  );
};

export default ImageInput;
