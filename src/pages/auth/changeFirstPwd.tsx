import React, { useEffect } from 'react';
import { breadCrumbPathVar, emailVar } from '@/stores/gqlReactVars';
import ChangeFirstPwd from '@/views/employee/ChangeFirstPwd';
import router from 'next/router';
import { useReactiveVar } from '@apollo/client';

const ChangeFirstPersonalPwd = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp', 'changePwd']);
  }, []);

  const emailInfo = useReactiveVar(emailVar);

  return (
    <>
      <ChangeFirstPwd emailInfo={emailInfo.emailInfo} />
    </>
  );
};

export default ChangeFirstPersonalPwd;
