import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { attendanceTimeVar, offTimeVar } from '@/modules/gqlReactVars';

const AttendanceRecord = () => {
  const workStartTime = useReactiveVar(attendanceTimeVar);
  const attendanceState = JSON.parse(sessionStorage.getItem('attendanceState') || '');
  const attendanceTime = JSON.parse(sessionStorage.getItem('attendanceTime') || '');

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="self-center">
      <span>출근시각 : {attendanceState ? `${format(workStartTime, 'MM-dd HH:mm')}` : '출근버튼을 눌러주세요'}</span>
    </div>
  );
};

export default AttendanceRecord;
