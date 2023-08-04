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
  const detailEmpId = typeof empId === 'string' ? parseInt(empId) : 0;
  console.log('empId', empId);

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
  return <>{!detailUserData ? <Spinner /> : <EditEmployee detailEmpId={detailEmpId} detailUserData={detailUserData} />}</>;
};

export default EditEmp;
