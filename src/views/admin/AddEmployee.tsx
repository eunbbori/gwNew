import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface EmployeeFormValues {
  employeeId: number;
  userId: string;
  employeeName: string;
  departmentName: string;
}
const AddEmployee: React.FC = () => {
  const schema = yup.object().shape({
    employeeId: yup.number().typeError('숫자를 입력해주세요').required('사번을 입력해주세요.').positive('양수를 입력해주세요').integer('정수를 입력해주세요'),
    userId: yup.string().required('아이디를 입력해주세요.'),
    employeeName: yup.string().required('이름 입력해주세요.'),
    departmentName: yup.string().required('부서명을 입력해주세요.'),
  });

  const {
    register,
    handleSubmit,
    reset,
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
    <div className="flex">
      <form onSubmit={handleSubmit(onAddEmployee)}>
        <div>
          <input className={inputStyle} {...register('employeeId')} placeholder="사번" />
          <div>{errors.employeeId?.message}</div>
          <input className={inputStyle} {...register('userId')} placeholder="아이디" />
          <div>{errors.userId?.message}</div>
          <input className={inputStyle} {...register('employeeName')} placeholder="이름" />
          <div>{errors.employeeName?.message}</div>
          <input className={inputStyle} {...register('departmentName')} placeholder="부서명" />
          <div>{errors.departmentName?.message}</div>
        </div>
        <div className="text-center">
          <button className={submitBtnStyle} type="submit">
            제출
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
