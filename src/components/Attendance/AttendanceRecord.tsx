import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { startEndAtVar } from '@/stores/gqlReactVars';

const AttendanceRecord = () => {
  const startEndAt = useReactiveVar(startEndAtVar);
  //const attendanceState = JSON.parse(sessionStorage.getItem('startAt') || '');
  //const attendanceTime = sessionStorage.getItem('startAt') && JSON.parse(sessionStorage.getItem('startAt') || '');
  /*
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  */

  return (
    <div className="self-center">
      <span>
        {startEndAt.endAt
          ? '퇴근시각 : ' + format(parseISO(startEndAt.endAt), 'MM-dd HH:mm')
          : startEndAt.startAt
          ? '출근시각 : ' + format(parseISO(startEndAt.startAt), 'MM-dd HH:mm')
          : ''}
      </span>
    </div>
  );
};

export default AttendanceRecord;
