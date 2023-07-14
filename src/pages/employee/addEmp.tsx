import { breadCrumbPathVar } from '@/stores/gqlReactVars';
import AddEmployee from '@/views/admin/AddEmployee';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const AddEmp = () => {
  const router = useRouter();

  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'addEmp']);
  }, []);

  let { deptId } = router.query;
  deptId = deptId as string;
  return <AddEmployee deptId={deptId} />;
};

export default AddEmp;
