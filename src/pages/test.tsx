import React from 'react';
import { IEmployee, useGetEmployeeQuery } from '../types/generated/types';
import { GetEmployeeDocument } from '../types/generated/types';
import { useQuery } from '@apollo/client';

const test = () => {
  const { data, loading, error } = useQuery(GetEmployeeDocument);
  console.log('data?.employees', data?.employees);
  const empName = data?.employees![0]!['employeeName'];
  console.log(empName);
  return <h1>hello</h1>;
};

export default test;
