import React from 'react';
import dynamic from 'next/dynamic';

const DynamicAttendance = dynamic(() => import('@/views/attendance/Attendance'), {
  ssr: false,
});

const ListAttendance = () => {
  return (
    <div>
      <DynamicAttendance />
    </div>
  );
};

export default ListAttendance;
