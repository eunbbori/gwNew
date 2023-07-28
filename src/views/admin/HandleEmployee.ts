import { useCallback, useState } from 'react';
import * as yup from 'yup';

// css styles
const inputClassName =
  'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
const paragraphClassName = 'text-sm text-[#484848] self-center';
const errMsgClassName = 'text-[11px] text-red-400';
const textClassName =
  'text-[18px] text-[#e8e8e8] bg-[#5a5a5a] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] bg-clip-padding py-2 px-3 font-normal transition-all';
const cancelClassName =
  'inline-block px-6 py-3 mt-6 mb-2 mr-4 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white';
const submitClassName =
  'from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500 inline-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl hover:bg-slate-700 hover:text-white';

export const classNames = {
  input: inputClassName,
  paragraph: paragraphClassName,
  error: errMsgClassName,
  cancel: cancelClassName,
  submit: submitClassName,
};
export const defaultTextAttributes = {
  inputClassName: textClassName,
  paragraphClassName,
};

export const defaultInputAttributes = {
  inputClassName,
  paragraphClassName,
  type: 'text',
};

// AddEmployee & EditEmployee interfaces
export interface IEmployeeEditFormValues {
  img: string;
  userId: string;
  name: string;
  email: string;
  departmentId: string;
  contractType: string;
  phone: string;
  startDate: string;
  position: string;
}

export interface IEmployeeFormValues extends IEmployeeEditFormValues {
  passwd: string;
  passwdConfirm: string;
}

// Yup schema
export const editSchema = yup.object().shape({
  userId: yup.string().required('아이디는 필수 입력사항입니다.'),
  name: yup.string().required('이름은 필수 입력사항입니다.'),
  phone: yup.string().required('핸드폰 번호는 필수 입력사항입니다.').max(11, '핸드폰 번호는 11자리까지 입력 가능합니다.'),
  email: yup.string().required('이메일은 필수 입력사항입니다').email('이메일 형식에 맞지 않습니다.'),
  startDate: yup.date().required('입사일은 필수 입력사항입니다'),
  contractType: yup.string().required('계약형태는 필수 선택사항입니다'),
  departmentId: yup.string().required('부서는 필수 선택사항입니다'),
  position: yup.string().required('직급은 필수 선택사항입니다'),
});

export const addSchema = yup
  .object()
  .shape({
    passwd: yup.string().min(6, '6글자 이상 10글자 이하로 입력해주세요.').required('비밀번호는 필수 입력사항입니다'),
    passwdConfirm: yup
      .string()
      .oneOf([yup.ref('passwd')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호는 필수 입력사항입니다'),
  })
  .concat(editSchema);

// Image register & modification handler
export const useHandleEmployeeImage = () => {
  const [imgFile, setImgFile]: any = useState(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const changeEmployeeImage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setUploadedFile(file);
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

  const deleteImgHandler = () => {
    setImgFile(null);
  };

  return [imgFile, uploadedFile, setImgFile, changeEmployeeImage, deleteImgHandler];
};
