import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';

const DynamicAttendance = dynamic(() => import('@/views/attendance/Attendance'), {
  ssr: false,
});

const DailyAttendance = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'attendance', 'dailyAttendance']);
  }, []);

  return <DynamicAttendance />;
};

export default DailyAttendance;
