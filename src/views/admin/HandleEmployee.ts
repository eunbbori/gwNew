import { ICheckUserIdDuplicationQuery } from '@/types/generated/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UseFormSetFocus, UseFormSetValue } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert';

// css styles
// const inputClassName =
//   'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
const inputClassName =
  'text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
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
const yupStringRequiredNotTrim = (title: string) => yup.string().required(`${title} 필수 입력사항입니다.`);
const yupStringRequired = (title: string) => yup.string().trim().required(`${title} 필수 입력사항입니다.`);
const yupStringRequiredMax = (title: string, max: number) => yupStringRequired(title).max(max, `${max}자 이하로 입력해주세요.`);
const yupStringRequiredMinMax = (title: string, min: number, max: number) => yupStringRequiredMax(title, max).min(min, `${min}자 이상으로 입력해주세요.`);

export const editSchema = yup.object().shape({
  userId: yupStringRequiredNotTrim('아이디는').matches(/^[\wㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/, '아이디값은 특수문자 및 공백을 제외하고 최대 20자 제한입니다.'),
  name: yupStringRequiredMax('이름은', 50),
  phone: yupStringRequired('핸드폰 번호는').matches(/^01([016789])-?(\d{3,4})-?(\d{4})$/, '유효한 핸드폰 번호 형식이 아닙니다.'),
  email: yupStringRequiredMax('이메일은', 256).matches(/^[^@]*$/, '메일 아이디는 "@" 기호를 포함해서는 안 됩니다.'),
  startDate: yup.date().required('입사일은 필수 입력사항입니다'),
  contractType: yupStringRequired('계약형태는'),
  departmentId: yupStringRequired('부서는'),
  position: yupStringRequired('직급은'),
});
export const yupEmail = yupStringRequired('이메일은').matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.');

export const yupPassword = yupStringRequiredMinMax('비밀번호는', 6, 256);

export const passwordSchema = yup.object().shape({
  passwd: yupPassword,
  passwdConfirm: yupStringRequired('비밀번호는').oneOf([yup.ref('passwd')], '비밀번호가 일치하지 않습니다.'),
});

export const addSchema = passwordSchema.concat(editSchema);

// Check User ID Duplication
interface IHandleUserIdDup {
  isChecking: boolean;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
  userIdData: ICheckUserIdDuplicationQuery | undefined;
  setValue: UseFormSetValue<any>;
  setFocus: UseFormSetFocus<any>;
}

export const handleUserIdDup = (args: IHandleUserIdDup) => {
  if (args.isChecking && args.currentUserId.trim().length > 0) {
    if (!args.currentUserId) {
      Swal('아이디를 입력해주세요').then(() => {
        args.setFocus('userId');
      });
    } else {
      if (args.userIdData) {
        if (args.userIdData.checkUserIdDuplication) {
          Swal({ text: `${args.currentUserId}는 사용 불가능한 아이디입니다.`, icon: 'warning' }).then(() => {
            args.setValue('userId', '');
            args.setFocus('userId');
          });
        } else {
          Swal({ text: '사용 가능한 아이디입니다.', icon: 'success' });
          return;
        }
      }
    }
    args.setIsChecking(false);
  }
};

// Image register & modification handler
export const useRouteEmployeeList = () => {
  const router = useRouter();

  const routeEmployeeList = () => {
    router.push('/employee/listEmp');
  };

  return { routeEmployeeList };
};
