import TableHeader from '@/views/attendance/TableHeader';
import TableRows from '@/views/attendance/TableRows';
import { useGetEmployeeWorkingQuery, useAttendedSubscription } from '@/types/generated/types';
import DateMemberCnt from '@/views/attendance/DateMemberCnt';
import { format, isToday } from 'date-fns';
import { useReactiveVar } from '@apollo/client';
import { attendanceDateVar } from '@/stores/gqlReactVars';
import { useCallback } from 'react';

const useMyEmployeeWorking = () => {
  const selectedAttendanceDate = useReactiveVar(attendanceDateVar);

  const refetchEmployeeWorking = useCallback(() => {
    refetch({
      dt: format(selectedAttendanceDate, 'yyyy-MM-dd (cccccc)'),
    });
  }, [selectedAttendanceDate]);

  const { data, refetch } = useGetEmployeeWorkingQuery({
    variables: {
      dt: format(selectedAttendanceDate, 'yyyy-MM-dd (cccccc)'),
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      alert('Plz Login first!');
    },
  });

  return { selectedAttendanceDate, refetchEmployeeWorking, data };
};

const Attendance = () => {
  const { selectedAttendanceDate, refetchEmployeeWorking, data } = useMyEmployeeWorking();

  useAttendedSubscription({
    onData: (options) => {
      if (isToday(selectedAttendanceDate)) refetchEmployeeWorking();
    },
  });

  return (
    <>
      <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
        <div className="flex flex-wrap mt-0 -mx-3">
          <DateMemberCnt cnt={data?.employeeWorking?.length} selectedDate={selectedAttendanceDate} />
        </div>
      </div>
      <div className="flex-auto p-6 px-0 pb-2">
        <div className="overflow-x-auto">
          <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
            <TableHeader />
            <tbody>
              <TableRows data={data} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Attendance;
