import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Text from '@/components/Input/Text';
import TextInput from '@/components/Input/TextInput';
import { useChangePwdMutation } from '@/types/generated/types';
import Swal from 'sweetalert';

export interface IEmployeePwdChangeFormValues {
  passwd: string;
  passwdConfirm: string;
}

interface IChangePwd {
  detailUserData: any;
}

const ChangeEmpPwd = (props: IChangePwd) => {
  const router = useRouter();
  const schema = yup.object().shape({
    passwd: yup.string().min(6, '6글자 이상 10글자 이하로 입력해주세요.').required('비밀번호는 필수 입력사항입니다'),
    passwdConfirm: yup
      .string()
      .oneOf([yup.ref('passwd')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호는 필수 입력사항입니다'),
  });

  const inputClassName =
    'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
  const errMsgClassName = 'text-[11px] text-red-400';
  const paragraphClassName = 'text-sm text-[#484848] self-center';
  const textClassName =
    'text-[18px] text-[#e8e8e8] bg-[#5a5a5a] focus:shadow-soft-primary-outline ease-soft block w-full appearance-none rounded-[4px] bg-clip-padding py-2 px-3 font-normal transition-all';
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEmployeePwdChangeFormValues>({
    resolver: yupResolver(schema),
  });

  const [changePwdMutation] = useChangePwdMutation();
  const cancelHandler = () => {
    router.push('/employee/listEmp');
  };

  const onChangePwd = (inputData: IEmployeePwdChangeFormValues) => {
    console.log(inputData);

    changePwdMutation({
      variables: {
        employeeId: props.detailUserData?.employee?.employeeId,
        pwd: inputData.passwd,
      },
      onCompleted: (data) => {
        Swal('수정됐습니다', '', 'success').then((result) => {
          router.push('/employee/listEmp');
        });
      },
      onError: (err) => {
        Swal('ERROR', '', 'error');
      },
    });
  };

  const defaultInputAttributes = {
    control,
    type: 'text',
    inputClassName,
    paragraphClassName,
  };

  return (
    <div className="w-full mr-auto ml-auto px-6">
      <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
        <div className="w-full max-w-full px-3 mx-auto mt-[400px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
          <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
            <div className="flex-auto p-6 w-[600px] border rounded-lg border-dashed border-gray-400">
              <form onSubmit={handleSubmit(onChangePwd)} role="form text-left">
                <div className="mb-4 flex justify-between">
                  <div className="w-[250px] self-end">
                    <Text
                      inputClassName={textClassName}
                      paragraphClassName={paragraphClassName}
                      title="사번"
                      value={props.detailUserData?.employee?.employeeId}
                    />
                  </div>
                  <div className="w-[250px] self-end">
                    <Text
                      inputClassName={textClassName}
                      paragraphClassName={paragraphClassName}
                      title="아이디"
                      value={props.detailUserData?.employee?.userId}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <TextInput {...defaultInputAttributes} name="passwd" title="임시 비밀번호" placeHolder="비밀번호를 입력해주세요" type="password" />
                  <div className={errMsgClassName}>{errors.passwd?.message}</div>
                </div>
                <div className="mb-4">
                  <TextInput
                    {...defaultInputAttributes}
                    name="passwdConfirm"
                    title="임시 비밀번호 확인"
                    placeHolder="비밀번호 한번 더 입력해주세요"
                    type="password"
                  />
                  <div className={errMsgClassName}>{errors.passwdConfirm?.message}</div>
                </div>
                <div className="text-center flex justify-end">
                  <button
                    type="button"
                    onClick={cancelHandler}
                    className="inline-block px-6 py-3 mt-6 mb-2 mr-4 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500 inline-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl hover:bg-slate-700 hover:text-white"
                  >
                    확인
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmpPwd;
