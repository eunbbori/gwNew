import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { breadCrumbPathVar, jwtTokensVar } from '@/stores/gqlReactVars';
import ChangeEmpPwd from '@/views/admin/ChangeEmpPwd';
import { useGetEmployeeLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import Swal from 'sweetalert';

const ChangePwd = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp', 'changePwd']);
  }, []);

  const jwtTokens = useReactiveVar(jwtTokensVar);

  const router = useRouter();
  const { empId } = router.query;
  const detailEmpId = typeof empId === 'string' ? parseInt(empId) : 0;

  const [getEmployee, { data: detailUserData }] = useGetEmployeeLazyQuery({
    variables: {
      employeeId: detailEmpId,
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('세션이 만료되어 다시 로그인 해주시기 바랍니다.', '', 'error').then((result) => {
        router.push('/auth/login');
      });
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) getEmployee();
  }, [jwtTokens]);

  console.log('detailUserData', detailUserData);
  return <>{detailUserData && <ChangeEmpPwd detailUserData={detailUserData} />}</>;
};

export default ChangePwd;
