import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';

interface OtherOptions {
  name: string;
  title: string;
  value?: string;
  placeHolder: string;
  optional?: boolean;

  inputClassName: string;
}

const PhoneNoInput = (props: OtherOptions) => {
  const { register } = useFormContext();
  const fields = register(props.name);

  const formatPhoneNo = (phoneNo: string) => {
    const phoneLength = phoneNo.length ?? 0;
    if (phoneLength < 4) return phoneNo;
    else if (phoneLength < 7) return phoneNo.replace(/(\d{3})(\d)/, '$1-$2');
    else if (phoneLength < 11) return phoneNo.replace(/(\d{3})(\d{3})(\d)/, '$1-$2-$3');
    else return phoneNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  return (
    <>
      <p className="text-sm text-[#484848]">
        {props.title}
        {!props.optional ? <FontAwesomeIcon className={'ml-1 text-sm font-bold text-rose-500'} icon={faAsterisk} /> : ''}
      </p>
      <input
        name={fields.name}
        ref={fields.ref}
        placeholder={props.placeHolder}
        type="text"
        className={props.inputClassName}
        aria-label={props.name}
        aria-describedby={props.name + '-addon'}
        onBlur={fields.onBlur}
        onChange={(e) => {
          const phoneNo = e.target.value.trim().replace(/\D/g, '');
          e.target.value = formatPhoneNo(phoneNo);
          fields.onChange(e);
        }}
      />
    </>
  );
};

export default PhoneNoInput;
