import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import offTime from '@/modules/offTime';
import { toDateFormatWithTime } from '@/utils/toDateFormat';

const AttendanceRecord = () => {
  const RecordedOffTime = useReactiveVar(offTime);
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
      <span>퇴근시각 : {toDateFormatWithTime(RecordedOffTime)}</span>
    </div>
  );
};

export default AttendanceRecord;
