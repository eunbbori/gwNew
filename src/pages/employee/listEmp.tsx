import React from 'react';
import dynamic from 'next/dynamic';

const DynamicListEmployee = dynamic(() => import('@/views/employee/ListEmployee'), {
  ssr: false,
});

const listEmp = () => {
  return (
    <>
      <DynamicListEmployee />
    </>
  );
};

export default listEmp;
