import React from 'react';
import dynamic from 'next/dynamic';

const ListAttendance = () => {
  const DynamicAttendance = dynamic(() => import('@/views/attendance/Attendance'), {
    ssr: false,
  });
  return (
    <div>
      <DynamicAttendance />
    </div>
  );
};

export default ListAttendance;
