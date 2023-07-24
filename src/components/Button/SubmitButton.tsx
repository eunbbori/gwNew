interface ISubmitButtonProps {
  text: string;
  submitClassName: string;
}

const SubmitButton = (props: ISubmitButtonProps) => {
  return (
    <button type="submit" className={props.submitClassName}>
      {props.text}
    </button>
  );
};

export default SubmitButton;
