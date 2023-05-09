import React from 'react';
import { IEmployee, useGetEmployeeQuery } from '../types/generated/types';
import { GetEmployeeDocument } from '../types/generated/types';
import { useQuery } from '@apollo/client';

const test = () => {
  // const { data, loading, error } = useQuery<IEmployee>(GetEmployeeDocument);
  const { data, loading, error } = useQuery(GetEmployeeDocument);
  // const { data, loading, error } = useGetEmployeeQuery();
  // const { data } = useQuery<IEmployee>({ query: GetEmployeeDocument });
  // console.log('data', data.employees);
  // const employeeData = data;
  // console.log('employeeData', employeeData);
  // const empName = employeeData.employees[0];
  // console.log(empName);
  return (
    <>
      <h1>hello</h1>
      {/* <p>{data?.employeeName}</p> */}
    </>
  );
};

export default test;
