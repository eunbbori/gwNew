import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface EmployeeFormValues {
  userId: string;
  employeeName: string;
  department: string;
  contract: string;
  phone: string;
  email: string;
  joinDate: string;
}
const AddEmployee: React.FC = () => {
  const schema = yup.object().shape({
    userId: yup.string().required('아이디는 필수 입력사항입니다.'),
    employeeName: yup.string().required('이름은 필수 입력사항입니다.'),
    department: yup.string().required('부서명은 필수 입력사항입니다.'),
    phone: yup
      .string()
      .required('핸드폰 번호는 필수 입력사항입니다.')
      .matches(/^(?:\+?([0-9]{1,3}))?[- (]*(\d{3,4})[- )]*(\d{3,4})$/, '올바른 핸드폰 번호 형식이 아닙니다.'),
    email: yup
      .string()
      .required('이메일은 필수 입력사항입니다')
      .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.'),
    joinDate: yup
      .string()
      .required('입사일은 필수 입력사항입니다')
      .matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, '올바른 날짜 형식이 아닙니다.'),
  });
  const inputClassName =
    'text-[14px] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
  const errMsgClassName = 'text-[11px] text-red-400';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    // mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onAddEmployee = (data: EmployeeFormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full mr-auto ml-auto mt-[25vh] px-6">
      <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
        <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
          <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border">
            <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
              <h5 className="font-bold text-[#484848] text-[20px]">직원 추가</h5>
            </div>
            <div className="flex-auto p-6">
              <form onSubmit={handleSubmit(onAddEmployee)} role="form text-left">
                <div className="mb-4 flex justify-between">
                  <div>
                    <p className="text-sm text-[#484848] w-[300px]">아이디(회사 이메일)</p>
                    <input
                      {...register('userId')}
                      placeholder="id@jnfirst.co.kr"
                      type="text"
                      className={inputClassName}
                      aria-label="Id"
                      aria-describedby="Id-addon"
                    />
                    <div className={errMsgClassName}>{errors.userId?.message}</div>
                  </div>
                  <div>
                    <p className="text-sm text-[#484848] w-[200px]">이름</p>
                    <input
                      {...register('employeeName')}
                      placeholder="이름을 입력해주세요"
                      type="text"
                      className={inputClassName}
                      aria-label="Name"
                      aria-describedby="Name-addon"
                    />
                    <div className={errMsgClassName}>{errors.employeeName?.message}</div>
                  </div>
                </div>
                <div className="mb-4 flex justify-between">
                  <div>
                    <p className="text-sm text-[#484848] w-[300px]">부서</p>
                    <select className={inputClassName} {...register('department')} placeholder="부서를 선택해주세요">
                      <option value="0">경영지원부</option>
                      <option value="1">연구소</option>
                      <option value="2">개발부</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm text-[#484848] w-[200px]">계약형태</p>
                    <select className={inputClassName} {...register('contract')} placeholder="계약형태를 선택해주세요">
                      <option value="0">선택안됨</option>
                      <option value="1">정규직</option>
                      <option value="2">프리랜서</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#484848]">핸드폰번호</p>
                  <input
                    {...register('phone')}
                    placeholder="핸드폰번호를 입력해주세요"
                    className={inputClassName}
                    aria-label="Name"
                    aria-describedby="Name-addon"
                  />
                  <div className={errMsgClassName}>{errors.phone?.message}</div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#484848]">이메일(개인)</p>
                  <input
                    {...register('email')}
                    placeholder="개인 이메일을 입력해주세요"
                    type="email"
                    className={inputClassName}
                    aria-label="Name"
                    aria-describedby="Name-addon"
                  />
                  <div className={errMsgClassName}>{errors.email?.message}</div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-[#484848]">입사일</p>
                  <input {...register('joinDate')} placeholder="YYYY-MM-DD" className={inputClassName} aria-label="Name" aria-describedby="Name-addon" />
                  <div className={errMsgClassName}>{errors.joinDate?.message}</div>
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
  );
};

export default AddEmployee;
