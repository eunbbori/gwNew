import React, { useEffect } from 'react';
import { useGetAllEmployeeLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import { jwtTokensVar } from '@/stores/gqlReactVars';
import AllEmployeeProfile from '@/views/employee/AllEmployeeProfile';
import TeamEmployeeProfile from '@/views/employee/TeamEmployeeProfile';
import EmployeeTab from '@/views/employee/EmployeeTab';
import { Tab, initTE } from 'tw-elements';
import dynamic from 'next/dynamic';
import EmployeeList from '@/views/employee/EmployeeList';

const DynamicEmployeeTab = dynamic(() => import('@/views/employee/EmployeeTab'), {
  ssr: false,
});
const DynamicEmployeeList = dynamic(() => import('@/views/employee/EmployeeList'), {
  ssr: false,
});

const listEmp = () => {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getAllEmployeeQuery, { data }] = useGetAllEmployeeLazyQuery({
    fetchPolicy: 'no-cache',
    onError: (err) => {
      alert('Plz Login first!');
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) {
      console.log('TToKKEEN: ' + jwtTokens?.accessToken);
      getAllEmployeeQuery();
    }
  }, [jwtTokens]);

  return (
    <>
      {/* Tabs content */}
      <DynamicEmployeeList list={data} />
    </>
  );
};

export default listEmp;
