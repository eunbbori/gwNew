interface ICancelButtonProps {
  onClick: () => void;
  text: string;
  cancelClassName: string;
}

const CancelButton = (props: ICancelButtonProps) => {
  return (
    <button type="button" onClick={props.onClick} className={props.cancelClassName}>
      {props.text}
    </button>
  );
};

export default CancelButton;
