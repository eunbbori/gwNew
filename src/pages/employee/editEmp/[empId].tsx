import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { breadCrumbPathVar, jwtTokensVar } from '@/stores/gqlReactVars';
import EditEmployee from '@/views/admin/EditEmployee';
import { useGetEmployeeLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import Swal from 'sweetalert';
import Spinner from '@/components/Spinner';

const EditEmp = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp', 'editEmp']);
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
  return <>{!detailUserData ? <Spinner /> : <EditEmployee detailEmpId={detailEmpId} detailUserData={detailUserData} />}</>;
};

export default EditEmp;
