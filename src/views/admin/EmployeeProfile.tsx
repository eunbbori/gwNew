import ImageInput from '@/components/Input/ImageInput';
import { FieldPath, FieldValues, UseControllerProps } from 'react-hook-form';
import { IoIosClose } from 'react-icons/io';
import Image from 'next/image';
import blankProfile from 'src/assets/img/profile/blank-profile-picture-640.png';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useHandleEmployee } from './HandleEmployee';

interface IEmployeeProfileProps {
  info: string;
  imgFile?: string;
  inputClassName: string;
  paragraphClassName: string;
  setUploadedFile: Dispatch<SetStateAction<File | null>>;
}

const EmployeeProfile = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: UseControllerProps<TFieldValues, TName> & IEmployeeProfileProps,
) => {
  const [imgFile, setImgFile]: any = useState(null);

  const { uploadedFile } = useHandleEmployee();

  useEffect(() => {
    setImgFile(props.imgFile);
  }, [props.imgFile]);

  const deleteImgHandler = () => {
    setImgFile(null);
  };

  const changeEmployeeImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      props.setUploadedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImgFile(reader.result);
          event.target.value = '';
        }
      };
    }
  }, []);

  return (
    <label htmlFor="inputFile">
      <ImageInput
        id="inputFile"
        name={props.name ?? 'img'}
        title={'프로필 이미지'}
        control={props.control}
        onChange={changeEmployeeImage}
        accept=".jpg,.png,.jpeg"
        inputClassName={props.inputClassName}
        paragraphClassName={props.paragraphClassName}
      />
      <div className="relative cursor-pointer w-[250px] h-[250px] overflow-hidden">
        <div className="group">
          <Image src={imgFile ? imgFile : blankProfile} alt="프로필 이미지" width={250} height={250} className="cursor-pointer" />
          <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="absolute top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-lg font-bold">{props.info}</span>
          </div>
          <button type="button" className="absolute top-0 right-[10px] text-gray-500" onClick={deleteImgHandler}>
            <IoIosClose className="text-4xl" />
          </button>
        </div>
      </div>
    </label>
  );
};

export default EmployeeProfile;
