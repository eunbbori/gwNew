import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Text from '@/components/Input/Text';
import { useChangePwdMutation } from '@/types/generated/types';
import Swal from 'sweetalert';
import { classNames } from './HandleEmployee';
import SubmitButton from '@/components/Button/SubmitButton';
import CancelButton from '@/components/Button/CancelButton';
import Spinner from '@/components/Spinner';
import TextInput from '@/components/Input/TextInput';

export interface IEmployeePwdChangeFormValues {
  passwd: string;
  passwdConfirm: string;
}

interface IChangePwd {
  detailUserData: any;
}
const cancelClassName =
  'inline-block px-6 py-3 mt-6 mb-2 mr-4 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white';
const submitClassName =
  'from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500 inline-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl hover:bg-slate-700 hover:text-white';

const ChangeEmpPwd = (props: IChangePwd) => {
  const router = useRouter();
  const schema = yup.object().shape({
    passwd: yup.string().min(6, '6글자 이상 10글자 이하로 입력해주세요.').required('비밀번호는 필수 입력사항입니다'),
    passwdConfirm: yup
      .string()
      .oneOf([yup.ref('passwd')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호는 필수 입력사항입니다'),
  });

  const methods = useForm<IEmployeePwdChangeFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { passwd: '', passwdConfirm: '' },
  });

  const [changePwdMutation, { loading }] = useChangePwdMutation();
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full mr-auto ml-auto px-6">
            <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
              <div className="w-full max-w-full px-3 mx-auto mt-[400px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
                  <div className="flex-auto p-6 w-[600px] border rounded-lg border-dashed border-gray-400">
                    <form onSubmit={methods.handleSubmit(onChangePwd)} role="form text-left">
                      <FormProvider {...methods}>
                        <div className="mb-4 flex justify-between">
                          <div className="w-[250px] self-end">
                            <Text title="사번" value={props.detailUserData?.employee?.employeeId} />
                          </div>
                          <div className="w-[250px] self-end">
                            <Text title="아이디" value={props.detailUserData?.employee?.userId} />
                          </div>
                        </div>
                        <div className="mb-4">
                          <TextInput name="passwd" title="변경 비밀번호" placeHolder="비밀번호를 입력해주세요" type="password" />
                          <div className={classNames.error}>{methods.formState.errors.passwd?.message}</div>
                        </div>
                        <div className="mb-4">
                          <TextInput name="passwdConfirm" title="변경 비밀번호 확인" placeHolder="비밀번호 한번 더 입력해주세요" type="password" />
                          <div className={classNames.error}>{methods.formState.errors.passwdConfirm?.message}</div>
                        </div>
                        <div className="text-center flex justify-end">
                          <CancelButton onClick={cancelHandler} text="취소" cancelClassName={cancelClassName} />
                          <SubmitButton text="수정" submitClassName={submitClassName} />
                        </div>
                      </FormProvider>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChangeEmpPwd;
