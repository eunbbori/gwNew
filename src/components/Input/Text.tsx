import { defaultTextAttributes } from '@/views/admin/HandleEmployee';

interface OtherOptions {
  title: string;
  value: string;
}

const Text = (props: OtherOptions) => {
  return (
    <>
      <p className={defaultTextAttributes.paragraphClassName}>{props.title}</p>
      <input disabled className={defaultTextAttributes.inputClassName} value={props.value} />
    </>
  );
};

export default Text;
