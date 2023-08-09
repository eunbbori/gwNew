import React, { useEffect } from 'react';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';
import ChangeMyPwd from '@/views/employee/ChangeMyPwd';

const ChangePersonalPwd = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp', 'changePwd']);
  }, []);

  return (
    <>
      <ChangeMyPwd />
    </>
  );
};

export default ChangePersonalPwd;
