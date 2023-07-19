import ImageInput from '@/components/Input/ImageInput';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';

interface IEmployeeProfileProps {
  title: string;
  info: string;
  imgRef: React.RefObject<HTMLInputElement>;
  handleAddImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  imgDeleteHandler: () => void;
  inputClassName: string;
  paragraphClassName: string;
  imgFile: any;
}

const EmployeeProfile = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & IEmployeeProfileProps,
) => {
  return (
    <label htmlFor="inputFile">
      <ImageInput
        id="inputFile"
        name={props.name}
        title={props.title}
        control={props.control}
        ref={props.imgRef}
        onChange={props.handleAddImage}
        accept=".jpg,.png,.jpeg"
        inputClassName={props.inputClassName}
        paragraphClassName={props.paragraphClassName}
      />
      <div className="relative cursor-pointer w-[250px] h-[250px] overflow-hidden">
        <div className="group">
          <Image src={props.imgFile ? props.imgFile : blankProfile} alt="프로필 이미지" width={250} height={250} className="cursor-pointer" />
          <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-lg font-bold">{props.info}</span>
          </div>
          <button type="button" className="absolute top-0 right-[10px] text-gray-500" onClick={props.imgDeleteHandler}>
            <IoIosClose className="text-4xl" />
          </button>
        </div>
      </div>
    </label>
  );
};

export default EmployeeProfile;
