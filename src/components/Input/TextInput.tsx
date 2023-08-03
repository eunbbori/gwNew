import { useFormContext } from 'react-hook-form';
import { defaultInputAttributes } from '@/views/admin/HandleEmployee';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OtherOptions {
  name: string;
  title: string;
  placeHolder: string;
  type?: string;
  optional?: boolean;

  divClassName?: string;
  inputClassName?: string;
  paragraphClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInput = (props: OtherOptions) => {
  const { register } = useFormContext();
  const fields = register(props.name);

  return (
    <div className={props.divClassName}>
      <p className={props.paragraphClassName ?? defaultInputAttributes.paragraphClassName}>
        {props.title}
        {!props.optional ? <FontAwesomeIcon className={'ml-1 text-sm font-bold text-rose-500'} icon={faAsterisk} /> : ''}
      </p>
      <input
        name={fields.name}
        ref={fields.ref}
        placeholder={props.placeHolder}
        type={props.type ?? 'text'}
        className={props.inputClassName ?? defaultInputAttributes.inputClassName}
        aria-label={props.name}
        aria-describedby={props.name + '-addon'}
        onBlur={fields.onBlur}
        onChange={(e) => {
          fields.onChange(e);
          if (props.onChange) {
            props.onChange(e);
          }
        }}
      />
    </div>
  );
};

export default TextInput;
