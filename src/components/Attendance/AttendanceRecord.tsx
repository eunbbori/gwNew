import React, { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { startEndAtVar } from '@/stores/gqlReactVars';
import { calculateDateDiff } from '@/components/Util/DateUtil';

const AttendanceRecord = () => {
  const [duration, setDuration] = useState<string | undefined>('');
  const startEndAt = useReactiveVar(startEndAtVar);

  useEffect(() => {
    if (startEndAt.startAt && !startEndAt.endAt) {
      const timer = setInterval(() => {
        setDuration(calculateDateDiff(parseISO(startEndAt.startAt), new Date()));
      }, 1000);
      return () => clearInterval(timer);
    } else {
      return;
    }
  }, [startEndAt]);

  return (
    <div className="self-center">
      <span>
        {startEndAt.startAt && '출근 : ' + format(parseISO(startEndAt.startAt), 'MM-dd HH:mm')}
        {startEndAt.endAt && ' / ' + '퇴근 : ' + format(parseISO(startEndAt.endAt), 'MM-dd HH:mm')}
        {startEndAt.startAt && startEndAt.endAt && (
          <strong className="text-red-400"> / 근무 : {calculateDateDiff(parseISO(startEndAt.startAt), parseISO(startEndAt.endAt))}</strong>
        )}
        {startEndAt.startAt && !startEndAt.endAt && <strong className="text-red-400"> / 근무 : {duration}</strong>}
      </span>
    </div>
  );
};

export default AttendanceRecord;
