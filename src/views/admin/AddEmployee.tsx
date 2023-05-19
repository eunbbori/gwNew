import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface EmployeeFormValues {
  employeeId: number;
  userId: string;
  employeeName: string;
  department: string;
}
const AddEmployee: React.FC = () => {
  const schema = yup.object().shape({
    employeeId: yup.number().typeError('숫자를 입력해주세요').required('사번을 입력해주세요.').positive('양수를 입력해주세요').integer('정수를 입력해주세요'),
    userId: yup.string().required('아이디를 입력해주세요.'),
    employeeName: yup.string().required('이름을 입력해주세요.'),
    department: yup.string().required('부서명을 선택해주세요.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    // mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const inputStyle =
    'mb-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  const submitBtnStyle =
    'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

  const onAddEmployee = (data: EmployeeFormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full mr-auto ml-auto px-6">
      <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
        <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
          <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
              <h5>Register with</h5>
            </div>
            <div className="flex-auto p-6">
              <form onSubmit={handleSubmit(onAddEmployee)} role="form text-left">
                <div className="mb-4">
                  <input
                    {...register('employeeId')}
                    placeholder="사번"
                    type="text"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    aria-label="EmpId"
                    aria-describedby="EmpId-addon"
                  />
                  <div>{errors.employeeId?.message}</div>
                </div>
                <div className="mb-4">
                  <input
                    {...register('userId')}
                    placeholder="아이디"
                    type="test"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    aria-label="Id"
                    aria-describedby="Id-addon"
                  />
                  <div>{errors.userId?.message}</div>
                </div>
                <div className="mb-4">
                  <input
                    {...register('employeeName')}
                    placeholder="이름"
                    type="text"
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    aria-label="Name"
                    aria-describedby="Name-addon"
                  />
                  <div>{errors.employeeName?.message}</div>
                </div>
                <div className="mb-4">
                  <select
                    className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                    {...register('department')}
                  >
                    <option value="0">경영지원부</option>
                    <option value="1">연구소</option>
                    <option value="2">개발부</option>
                  </select>
                </div>
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

    // <div className="flex">
    //   <form onSubmit={handleSubmit(onAddEmployee)}>
    //     <div>
    //       <input className={inputStyle} {...register('employeeId')} placeholder="사번" />
    //       <div>{errors.employeeId?.message}</div>
    //       <input className={inputStyle} {...register('userId')} placeholder="아이디" />
    //       <div>{errors.userId?.message}</div>
    //       <input className={inputStyle} {...register('employeeName')} placeholder="이름" />
    //       <div>{errors.employeeName?.message}</div>
    //       <input className={inputStyle} {...register('departmentName')} placeholder="부서명" />
    //       <div>{errors.departmentName?.message}</div>
    //     </div>
    //     <div className="text-center">
    //       <button className={submitBtnStyle} type="submit">
    //         제출
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddEmployee;
