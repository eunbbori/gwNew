interface OtherOptions {
  title: string;
  placeHolder: string;
  id: string;
  type: string;
  inputClassName: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const TextInputFilter = (props: OtherOptions) => {
  return (
    <>
      <p className="text-sm text-[#484848] w-[300px]">{props.title}</p>
      <input placeholder={props.placeHolder} id={props.id} type={props.type} className={props.inputClassName} onChange={props.onChange} />
    </>
  );
};

export default TextInputFilter;
