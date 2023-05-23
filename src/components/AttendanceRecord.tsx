import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { offTimeVar } from '@/modules/gplReactVars';

const AttendanceRecord = () => {
  const RecordedOffTime = useReactiveVar(offTimeVar);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="self-center">
      <span className="mr-5">이름 : TEST </span>
      <span>퇴근시각 : {format(RecordedOffTime, 'MM-dd HH:mm')}</span>
    </div>
  );
};

export default AttendanceRecord;
