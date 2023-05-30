import ListEmployee from '@/views/employee/ListEmployee';
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicMenu2 = dynamic(() => import('@/views/common/part/Menu2'), {
  ssr: false,
});
const listEmp = () => {
  return (
    <>
      <DynamicMenu2 />
      <ListEmployee />
    </>
  );
};

export default listEmp;
