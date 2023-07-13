import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';

const DynamicAttendance = dynamic(() => import('@/views/attendance/AttendanceConditional'), {
  ssr: false,
});

const ConditionalAttendance = () => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'attendance', 'conditionalAttendance']);
  }, []);

  return <DynamicAttendance />;
};

export default ConditionalAttendance;
