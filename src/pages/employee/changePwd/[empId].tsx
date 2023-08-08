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
  const detailEmpId = typeof empId === 'string' ? empId : '';

  const [getEmployee, { data: detailUserData }] = useGetEmployeeLazyQuery({
    variables: {
      employeeId: detailEmpId,
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      Swal('미접속시간(30분)이 경과하여 로그아웃합니다.', '', 'error').then((result) => {
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
