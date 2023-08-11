import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useChangePwdMutation } from '@/types/generated/types';
import Swal from 'sweetalert';
import SubmitButton from '@/components/Button/SubmitButton';
import CancelButton from '@/components/Button/CancelButton';
import Spinner from '@/components/Spinner';
import TextInput from '@/components/Input/TextInput';
import { classNames, myPasswordSchema } from '../admin/HandleEmployee';
import { useUserToken } from '@/repository/AccessToken';

export interface IEmployeePwdChangeFormValues {
  prevPasswd: string;
  passwd: string;
  passwdConfirm: string;
}

const cancelClassName =
  'inline-block px-6 py-3 mt-6 mb-2 mr-4 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white';
const submitClassName =
  'from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500 inline-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl hover:bg-slate-700 hover:text-white';

const ChangeMyPwd = () => {
  const useUserInfo = useUserToken();

  const router = useRouter();

  const methods = useForm<IEmployeePwdChangeFormValues>({
    resolver: yupResolver(myPasswordSchema),
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
        prevPwd: inputData.prevPasswd,
        employeeId: useUserInfo?.employeeId,
        pwd: inputData.passwd,
      },
      onCompleted: (data) => {
        Swal('수정됐습니다', '', 'success').then((result) => {
          router.push('/employee/listEmp');
        });
      },
      onError: (err) => {
        Swal('입력한 현재비밀번호가 일치하지 않거나, 변경할 비밀번호는 현재비밀번호와 달라야합니다', '', 'error');
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
                        <div className="mb-4">
                          <TextInput name="prevPasswd" title="현재 비밀번호" placeHolder="현재 비밀번호를 6자 이상 입력해주세요." type="password" />
                          {!methods.formState.errors.prevPasswd?.message && <div className={classNames.guide}>현재 비밀번호를 6자 이상으로 입력해주세요</div>}
                          <div className={classNames.error}>{methods.formState.errors.prevPasswd?.message}</div>
                        </div>
                        <div className="mb-4">
                          <TextInput name="passwd" title="변경 비밀번호" placeHolder="변경할 비밀번호를 입력해주세요" type="password" />
                          {!methods.formState.errors.passwd?.message && <div className={classNames.guide}>변경할 비밀번호를 6자 이상으로 입력해주세요</div>}
                          <div className={classNames.error}>{methods.formState.errors.passwd?.message}</div>
                        </div>
                        <div className="mb-4">
                          <TextInput name="passwdConfirm" title="변경 비밀번호 확인" placeHolder="변경할 비밀번호 한번 더 입력해주세요" type="password" />
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

export default ChangeMyPwd;
