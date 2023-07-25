import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployeeInput, useAddEmployeeMutation } from '@/types/generated/types';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerInput from '@/components/Input/DatePickerInput';
import SelectInput from '@/components/Input/SelectInput';
import TextInput from '@/components/Input/TextInput';
import PhoneNoInput from '@/components/Input/PhoneNoInput';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';
import { useCodesOption, useDepartmentsOption } from '@/repository/Code';
import EmployeeProfile from './EmployeeProfile';
import { format } from 'date-fns';
import Swal from 'sweetalert';
import { useHandleEmployeeImage, IEmployeeFormValues, addSchema, defaultInputAttributes, classNames } from './HandleEmployee';
import CancelButton from '@/components/Button/CancelButton';
import SubmitButton from '@/components/Button/SubmitButton';
import { useCheckUserIdDuplicationLazyQuery } from './../../types/generated/types';

interface IOption {
  value: string;
  label: string;
}
interface IAddEmployeeProps {
  deptId: string;
}

const cancelClassName =
  'w-full inline-block px-6 py-3 mt-6 mb-2 mr-4 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white';

const submitClassName =
  'w-full from-purple-700 to-pink-500 bg-fuchsia-500 hover:border-fuchsia-500 inline-block px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl hover:bg-slate-700 hover:text-white';

const AddEmployee = ({ deptId }: IAddEmployeeProps) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isDoubleCheck, setDoubleCheck] = useState(false);
  const router = useRouter();

  const deptOptions = useDepartmentsOption();
  const contractOptions = useCodesOption('CONTRACT_TYPE');
  const positionOptions = useCodesOption('POSITION');

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IEmployeeFormValues>({
    resolver: yupResolver(addSchema),
    defaultValues: { departmentId: deptId },
  });

  const currentUserId = getValues('userId');

  const controlledInputAttributes = { ...defaultInputAttributes, control };

  const cancelHandler = () => {
    router.push('/employee/listEmp');
  };

  const [checkUserIdDuplication, { data: userIdData }] = useCheckUserIdDuplicationLazyQuery({
    variables: {
      userId: currentUserId || '',
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });
  const doubleCheckHandler = () => {
    setIsChecking(true);
    setDoubleCheck(true);
    checkUserIdDuplication();
  };
  useEffect(() => {
    if (isChecking && userIdData && userIdData.checkUserIdDuplication === false && currentUserId !== '') {
      Swal({ text: '사용 가능한 아이디입니다.', icon: 'success' });
    } else if (isChecking && userIdData && userIdData.checkUserIdDuplication === true && currentUserId !== '') {
      reset({ userId: 'id' });
      Swal({ text: `${currentUserId}는 사용 불가능한 아이디입니다.`, icon: 'warning' });
    } else if (isChecking && currentUserId === '') {
      Swal('아이디를 입력해주세요');
    }
    setIsChecking(false);
  }, [isChecking, userIdData]);

  const [addEmployeeMutation] = useAddEmployeeMutation();
  const imgRef = useRef<HTMLInputElement>(null);

  const [imgFile, uploadedFile, changeEmployeeImage, deleteImgHandler] = useHandleEmployeeImage();

  const onAddEmployee = (inputData: IEmployeeFormValues) => {
    if (isDoubleCheck) {
      console.log(inputData);
      const { passwdConfirm: _, ...newInputData } = inputData;

      const input: IEmployeeInput = {
        ...newInputData,
        departmentId: parseInt(newInputData.departmentId),
      };
      addEmployeeMutation({
        variables: {
          input,
          file: uploadedFile,
        },
        onCompleted: (data) => {
          Swal('등록되었습니다', '', 'success').then((result) => {
            router.push('/employee/listEmp');
          });
        },
        onError: (err) => {
          Swal('ERROR', '', 'error');
        },
      });
    } else {
      Swal({ text: '아이디 중복 체크를 먼저 진행하세요.', icon: 'warning' });
    }
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="w-full mr-auto ml-auto px-6">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-[250px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
              <div className="flex-auto p-6 w-[600px]">
                <form onSubmit={handleSubmit(onAddEmployee)} role="form text-left">
                  <div className="mb-4 w-[250px]">
                    <EmployeeProfile
                      {...controlledInputAttributes}
                      name="img"
                      title="프로필 이미지"
                      info="사진을 저장하세요"
                      imgRef={imgRef}
                      handleAddImage={changeEmployeeImage}
                      imgDeleteHandler={deleteImgHandler}
                      imgFile={imgFile}
                    />
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <TextInput {...controlledInputAttributes} name="userId" title="아이디" placeHolder="아이디를 입력해주세요" />
                      <div className={classNames.error}>{errors.userId?.message}</div>
                    </div>
                    <div className="w-[250px] self-center mt-[20px]">
                      <button
                        type="button"
                        className={
                          'self-center mr-[15px] h-[30px] inline-block px-4 mb-0 text-xs text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg cursor-pointer xl-max:cursor-not-allowed xl-max:opacity-65 xl-max:pointer-events-none xl-max:bg-gradient-to-tl xl-max:from-purple-700 xl-max:to-pink-500 xl-max:text-white xl-max:border-0 hover:scale-102 hover:shadow-soft-xs active:opacity-85 leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 border-fuchsia-500 bg-none text-fuchsia-500 hover:border-fuchsia-500'
                        }
                        onClick={doubleCheckHandler}
                      >
                        중복체크
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <TextInput {...controlledInputAttributes} name="name" title="이름" placeHolder="이름을 입력해주세요" />
                    <div className={classNames.error}>{errors.name?.message}</div>
                  </div>
                  <div className="mb-4">
                    <TextInput {...controlledInputAttributes} name="email" title="회사 이메일" placeHolder="회사 이메일을 입력해주세요" type="email" />
                    <div className={classNames.error}>{errors.email?.message}</div>
                  </div>
                  <div className="mb-4">
                    <TextInput {...controlledInputAttributes} name="passwd" title="임시 비밀번호" placeHolder="비밀번호를 입력해주세요" type="password" />
                    <div className={classNames.error}>{errors.passwd?.message}</div>
                  </div>
                  <div className="mb-4">
                    <TextInput
                      {...controlledInputAttributes}
                      name="passwdConfirm"
                      title="임시 비밀번호 확인"
                      placeHolder="비밀번호 한번 더 입력해주세요"
                      type="password"
                    />
                    <div className={classNames.error}>{errors.passwdConfirm?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="departmentId"
                        control={control}
                        selectOptions={deptOptions}
                        title="부서"
                        placeHolder="부서를 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.departmentId?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <SelectInput
                        name="contractType"
                        control={control}
                        selectOptions={contractOptions}
                        title="계약형태"
                        placeHolder="계약형태를 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.contractType?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <PhoneNoInput name="phone" title="핸드폰번호" control={control} placeHolder="핸드폰번호를 입력해주세요" inputClassName={classNames.input} />
                    <div className={classNames.error}>{errors.phone?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="position"
                        control={control}
                        selectOptions={positionOptions}
                        title="직급"
                        placeHolder="직급을 선택해주세요"
                        paragraphClassName={classNames.paragraph}
                      />
                      <div className={classNames.error}>{errors.position?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <DatePickerInput name="startDate" control={control} title="입사일(YYYY-MM-DD)" defaultValue={format(new Date(), 'yyyy-MM-dd') ?? ''} />
                      <div className={classNames.error}>{errors.startDate?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4"></div>
                  <div className="text-center flex">
                    <CancelButton onClick={cancelHandler} text="취소" cancelClassName={cancelClassName} />
                    <SubmitButton text="등록" submitClassName={submitClassName} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AddEmployee;
