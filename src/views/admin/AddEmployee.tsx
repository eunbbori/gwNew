import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IEmployeeInput, useAddEmployeeMutation, useGetAllDepartmentsLazyQuery, useGetCodesLazyQuery } from '@/types/generated/types';
import { jwtTokensVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerInput from '@/components/Input/DatePickerInput';
import SelectInput from '@/components/Input/SelectInput';
import TextInput from '@/components/Input/TextInput';
import PhoneNoInput from '@/components/Input/PhoneNoInput';
import { ErrorBoundary } from '@/components/Error/ErrorBoundary';
import { ErrorFallback } from '@/components/Error/ErrorFallback';

export interface EmployeeFormValues {
  userId: string;
  name: string;
  email: string;
  passwd: string;
  departmentId: string;
  contractType: string;
  phone: string;
  startDate: string;
}

interface IOption {
  value: string;
  label: string;
}

const AddEmployee: React.FC = () => {
  const router = useRouter();
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getAllDepartmentsQuery, { data: deptData }] = useGetAllDepartmentsLazyQuery();

  const deptOptions =
    deptData?.departments?.map((dept) => ({
      value: dept?.departmentId ?? '',
      label: dept?.departmentName ?? '',
    })) ?? [];

  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: {
      parents: ['contractType'],
    },
    onError: (err) => {
      alert('err');
    },
  });

  const contractOptions =
    (codeData?.codes &&
      codeData?.codes[0]?.codes?.map((code) => ({
        value: code?.code ?? '',
        label: code?.name ?? '',
      }))) ??
    [];

  useEffect(() => {
    if (jwtTokens?.accessToken) {
      getAllDepartmentsQuery();
      getCodesQuery();
    }
  }, [jwtTokens]);

  const schema = yup.object().shape({
    userId: yup.string().required('아이디는 필수 입력사항입니다.'),
    name: yup.string().required('이름은 필수 입력사항입니다.'),
    phone: yup.string().required('핸드폰 번호는 필수 입력사항입니다.').max(11, '핸드폰 번호는 11자리까지 입력 가능합니다.'),
    email: yup.string().required('이메일은 필수 입력사항입니다').email('이메일 형식에 맞지 않습니다.'),
    startDate: yup.date().required('입사일은 필수 입력사항입니다'),
    //.matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, '올바른 날짜 형식이 아닙니다.'),
    contractType: yup.string().required('계약형태는 필수 선택사항입니다'),
    departmentId: yup.string().required('부서는 필수 선택사항입니다'),
  });

  const inputClassName =
    'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
  const errMsgClassName = 'text-[11px] text-red-400';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<EmployeeFormValues>({
    resolver: yupResolver(schema),
  });

  const [addEmployeeMutation] = useAddEmployeeMutation();

  const onAddEmployee = (inputData: EmployeeFormValues) => {
    console.log(inputData);
    const { userId, name, email, passwd, departmentId, contractType, phone, startDate } = inputData;
    const input: IEmployeeInput = {
      userId,
      name,
      email,
      passwd,
      departmentId: parseInt(departmentId),
      contractType,
      phone,
      startDate,
    };
    addEmployeeMutation({
      variables: {
        input,
      },
      onCompleted: (data) => {
        alert('등록됐습니다.');
        router.reload();

        console.log('data가 저장됐습니다', data.addEmployee?.userId);
      },
      onError: (err) => {
        alert(err.message);
      },
    });
  };

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="w-full mr-auto ml-auto px-6">
        <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-[250px] md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words border-0 rounded-2xl bg-clip-border items-center">
              <div className="p-6 mb-0 border-b-0 rounded-t-2xl">
                <h5 className="font-bold text-[#484848] text-[20px]">직원 추가</h5>
              </div>
              <div className="flex-auto p-6 w-[600px]">
                <form onSubmit={handleSubmit(onAddEmployee)} role="form text-left">
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <TextInput
                        name="userId"
                        title="아이디"
                        control={control}
                        placeHolder="아이디를 입력해주세요"
                        type="text"
                        inputClassName={inputClassName}
                      />
                      <div className={errMsgClassName}>{errors.userId?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <TextInput name="name" title="이름" control={control} placeHolder="이름을 입력해주세요" type="text" inputClassName={inputClassName} />
                      <div className={errMsgClassName}>{errors.name?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <TextInput
                      name="email"
                      title="회사 이메일"
                      control={control}
                      placeHolder="회사 이메일을 입력해주세요"
                      type="email"
                      inputClassName={inputClassName}
                    />
                    <div className={errMsgClassName}>{errors.email?.message}</div>
                  </div>
                  <div className="mb-4">
                    <TextInput
                      name="passwd"
                      title="임시 비밀번호"
                      control={control}
                      placeHolder="비밀번호를 입력해주세요"
                      type="password"
                      inputClassName={inputClassName}
                    />
                    <div className={errMsgClassName}>{errors.passwd?.message}</div>
                  </div>
                  <div className="mb-4 flex justify-between">
                    <div className="w-[250px]">
                      <SelectInput name="departmentId" control={control} selectOptions={deptOptions} title="부서" placeHolder="부서를 선택해주세요" />
                      <div className={errMsgClassName}>{errors.departmentId?.message}</div>
                    </div>
                    <div className="w-[250px]">
                      <SelectInput
                        name="contractType"
                        control={control}
                        selectOptions={contractOptions}
                        title="계약형태"
                        placeHolder="계약형태를 선택해주세요"
                      />
                      <div className={errMsgClassName}>{errors.contractType?.message}</div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <PhoneNoInput name="phone" title="핸드폰번호" control={control} placeHolder="핸드폰번호를 입력해주세요" inputClassName={inputClassName} />
                    <div className={errMsgClassName}>{errors.phone?.message}</div>
                  </div>

                  <div className="mb-4">
                    <DatePickerInput name="startDate" control={control} title="입사일(YYYY-MM-DD)" />
                    <div className={errMsgClassName}>{errors.startDate?.message}</div>
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
