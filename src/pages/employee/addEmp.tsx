import { breadCrumbPathVar } from '@/stores/gqlReactVars';
import AddEmployee from '@/views/admin/AddEmployee';
import React, { useEffect } from 'react';

const AddEmp = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'addEmp']);
  }, []);

  return <AddEmployee />;
};

export default AddEmp;
