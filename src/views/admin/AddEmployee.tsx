import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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

export interface EmployeeFormValues {
  img: string;
  userId: string;
  name: string;
  email: string;
  passwd: string;
  passwdConfirm: string;
  departmentId: string;
  contractType: string;
  phone: string;
  startDate: string;
  position: string;
}
interface IOption {
  value: string;
  label: string;
}

const AddEmployee: React.FC = () => {
  const router = useRouter();

  const deptOptions = useDepartmentsOption();

  const contractOptions = useCodesOption('CONTRACT_TYPE');
  const positionOptions = useCodesOption('POSITION');

  const schema = yup.object().shape({
    userId: yup.string().required('아이디는 필수 입력사항입니다.'),
    name: yup.string().required('이름은 필수 입력사항입니다.'),
    phone: yup.string().required('핸드폰 번호는 필수 입력사항입니다.').max(11, '핸드폰 번호는 11자리까지 입력 가능합니다.'),
    email: yup.string().required('이메일은 필수 입력사항입니다').email('이메일 형식에 맞지 않습니다.'),
    passwd: yup.string().min(6, '6글자 이상 10글자 이하로 입력해주세요.').required('비밀번호는 필수 입력사항입니다'),
    passwdConfirm: yup
      .string()
      .oneOf([yup.ref('passwd')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호는 필수 입력사항입니다'),
    startDate: yup.date().required('입사일은 필수 입력사항입니다'),
    //.matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, '올바른 날짜 형식이 아닙니다.'),
    contractType: yup.string().required('계약형태는 필수 선택사항입니다'),
    departmentId: yup.string().required('부서는 필수 선택사항입니다'),
    position: yup.string().required('직급은 필수 선택사항입니다'),
  });

  const inputClassName =
    'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
  const errMsgClassName = 'text-[11px] text-red-400';
  const paragraphClassName = 'text-sm text-[#484848] self-center';

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: yupResolver(schema),
  });

  const [addEmployeeMutation] = useAddEmployeeMutation();
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgFile, setImgFile]: any = useState(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log('file', file);
      setUploadedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImgFile(reader.result);
        }
      };
    }
  };

  console.log('uploadedFile', uploadedFile);
  const imgDeleteHandler = () => {
    setImgFile(null);
  };

  const onAddEmployee = (inputData: EmployeeFormValues) => {
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
        alert('등록됐습니다.');
        router.push('/employee/listEmp');

        console.log('data가 저장됐습니다', data.addEmployee?.userId);
      },
      onError: (err) => {
        alert(err.message);
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
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="w-full mr-auto ml-auto px-6">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-[250px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
              <div className="flex-auto p-6 w-[600px]">
                <form onSubmit={handleSubmit(onAddEmployee)} role="form text-left">
                  <div className="mb-4 w-[250px]">
                    <EmployeeProfile
                      {...defaultInputAttributes}
                      title="프로필 이미지"
                      info="사진을 저장하세요"
                      imgRef={imgRef}
                      handleAddImage={handleAddImage}
                      imgDeleteHandler={imgDeleteHandler}
                      imgFile={imgFile}
                    />
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <TextInput {...defaultInputAttributes} name="userId" title="아이디" placeHolder="아이디를 입력해주세요" />
                      <div className={errMsgClassName}>{errors.userId?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <TextInput {...defaultInputAttributes} name="name" title="이름" placeHolder="이름을 입력해주세요" />
                      <div className={errMsgClassName}>{errors.name?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <TextInput {...defaultInputAttributes} name="email" title="회사 이메일" placeHolder="회사 이메일을 입력해주세요" type="email" />
                    <div className={errMsgClassName}>{errors.email?.message}</div>
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
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="departmentId"
                        control={control}
                        selectOptions={deptOptions}
                        title="부서"
                        placeHolder="부서를 선택해주세요"
                        paragraphClassName={paragraphClassName}
                      />
                      <div className={errMsgClassName}>{errors.departmentId?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <SelectInput
                        name="contractType"
                        control={control}
                        selectOptions={contractOptions}
                        title="계약형태"
                        placeHolder="계약형태를 선택해주세요"
                        paragraphClassName={paragraphClassName}
                      />
                      <div className={errMsgClassName}>{errors.contractType?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <PhoneNoInput name="phone" title="핸드폰번호" control={control} placeHolder="핸드폰번호를 입력해주세요" inputClassName={inputClassName} />
                    <div className={errMsgClassName}>{errors.phone?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput
                        name="position"
                        control={control}
                        selectOptions={positionOptions}
                        title="직급"
                        placeHolder="직급을 선택해주세요"
                        paragraphClassName={paragraphClassName}
                      />
                      <div className={errMsgClassName}>{errors.position?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <DatePickerInput name="startDate" control={control} title="입사일(YYYY-MM-DD)" />
                      <div className={errMsgClassName}>{errors.startDate?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4"></div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                    >
                      등록하기
                    </button>
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
