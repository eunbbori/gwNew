import React, { useEffect } from 'react';
import { useGetAllEmployeeLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import { jwtTokensVar } from '@/stores/gqlReactVars';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert';

const DynamicEmployeeTab = dynamic(() => import('@/views/employee/EmployeeTab'), {
  ssr: false,
});

const ListEmp = () => {
  const jwtTokens = useReactiveVar(jwtTokensVar);

  const [getAllEmployeeQuery, { data }] = useGetAllEmployeeLazyQuery({
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) {
      console.log('TToKKEEN: ' + jwtTokens?.accessToken);
      getAllEmployeeQuery();
    }
  }, [jwtTokens]);

  return <DynamicEmployeeTab list={data} />;
};

export default ListEmp;
