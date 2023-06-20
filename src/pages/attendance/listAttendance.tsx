import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicAttendanceTab = dynamic(() => import('@/views/attendance/AttendanceTab'), {
  ssr: false,
});

const ListAttendance = () => {
  return <DynamicAttendanceTab />;
};

export default ListAttendance;
