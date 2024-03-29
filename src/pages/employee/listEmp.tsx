import React, { useEffect } from 'react';
import { useGetAllEmployeeLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import { jwtTokensVar } from '@/stores/gqlReactVars';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/router';

const DynamicEmployeeTab = dynamic(() => import('@/views/employee/EmployeeTab'), {
  ssr: false,
});

const ListEmp = () => {
  const jwtTokens = useReactiveVar(jwtTokensVar);
  const { push } = useRouter();

  const [getAllEmployeeQuery, { data, loading }] = useGetAllEmployeeLazyQuery({
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('미접속시간(30분)이 경과하여 로그아웃합니다.', '', 'error').then((result) => {
        push('/auth/login');
      });
    },
  });
  useEffect(() => {
    if (jwtTokens?.accessToken) {
      console.log('TToKKEEN: ' + jwtTokens?.accessToken);
      getAllEmployeeQuery();
    }
  }, [jwtTokens]);

  return <>{loading ? <Spinner /> : <DynamicEmployeeTab list={data} />}</>;
};

export default ListEmp;
