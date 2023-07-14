import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';
import EditEmployee from '@/views/admin/EditEmployee';
import { useGetEmployeeLazyQuery } from '@/types/generated/types';
import { memberDetailVar } from '@/stores/gqlReactVars';

const EditEmp = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp', 'editEmp']);
  }, []);

  const router = useRouter();
  const { empId } = router.query;
  const detailEmpId = typeof empId === 'string' ? parseInt(empId) : 0;
  const detailUserId = memberDetailVar().userId;
  console.log('empId', empId);
  console.log('detailUserId', detailUserId);

  const [getEmployee, { data: detailUserData }] = useGetEmployeeLazyQuery({
    variables: {
      userId: detailUserId,
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      alert('Plz Login first!');
    },
  });
  console.log('detailUserData', detailUserData);
  return <EditEmployee detailEmpId={detailEmpId} detailUserData={detailUserData} />;
};

export default EditEmp;
