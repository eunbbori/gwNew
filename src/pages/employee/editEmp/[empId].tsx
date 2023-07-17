import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { breadCrumbPathVar, jwtTokensVar } from '@/stores/gqlReactVars';
import EditEmployee from '@/views/admin/EditEmployee';
import { useGetEmployeeLazyQuery } from '@/types/generated/types';
import { useReactiveVar } from '@apollo/client';
import dynamic from 'next/dynamic';

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
      alert('Plz Login first!');
    },
  });

  useEffect(() => {
    if (jwtTokens?.accessToken) getEmployee();
  }, [jwtTokens]);

  console.log('detailUserData', detailUserData);
  return <EditEmployee detailEmpId={detailEmpId} detailUserData={detailUserData} />;
};

export default EditEmp;
