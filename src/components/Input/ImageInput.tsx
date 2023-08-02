import { defaultInputAttributes } from '@/views/admin/HandleEmployee';

interface OtherOptions {
  name: string;
  id: string;
  title: string;
  accept?: string;
  divClassName?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const ImageInput = (props: OtherOptions) => {
  return (
    <>
      <div className={props.divClassName}>
        <p className={defaultInputAttributes.paragraphClassName}>{props.title}</p>
        <input
          name={props.name}
          id={props.id}
          type="file"
          accept={props.accept}
          onChange={(e) => {
            props.onChange && props.onChange(e);
          }}
          className={defaultInputAttributes.inputClassName}
          style={{ display: 'none' }}
          aria-label={props.name}
          aria-describedby={props.name + '-addon'}
        />
      </div>
    </>
  );
};

export default ImageInput;
