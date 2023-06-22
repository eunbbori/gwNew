import TableHeader from '@/views/attendance/TableHeader';
import TableRows from '@/views/attendance/TableRows';
import { useAttendedSubscription, useGetAllDepartmentsLazyQuery, useGetCodesLazyQuery, useGetEmployeeWorkingLazyQuery } from '@/types/generated/types';
import DateMemberCnt from '@/views/attendance/DateMemberCnt';
import { format, isToday } from 'date-fns';
import { useReactiveVar } from '@apollo/client';
import { attendanceDateVar, jwtTokensVar } from '@/stores/gqlReactVars';
import { useCallback, useEffect } from 'react';
import { Input, Select, initTE } from 'tw-elements';

const useMyEmployeeWorking = () => {
  const selectedAttendanceDate = useReactiveVar(attendanceDateVar);

  const refetchEmployeeWorking = useCallback(() => {
    refetch({
      dt: format(selectedAttendanceDate, 'yyyy-MM-dd (cccccc)'),
    });
  }, [selectedAttendanceDate]);

  const [getEmployeeWorking, { data, refetch }] = useGetEmployeeWorkingLazyQuery({
    variables: {
      dt: format(selectedAttendanceDate, 'yyyy-MM-dd (cccccc)'),
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      alert('Plz Login first!');
    },
  });

  return { selectedAttendanceDate, getEmployeeWorking, refetchEmployeeWorking, data };
};

const Attendance = () => {
  useEffect(() => {
    initTE({ Input, Select });
  }, []);

  const jwtTokens = useReactiveVar(jwtTokensVar);
  const { selectedAttendanceDate, getEmployeeWorking, refetchEmployeeWorking, data } = useMyEmployeeWorking();

  useEffect(() => {
    if (jwtTokens?.accessToken) {
      getEmployeeWorking();
    }
  }, [jwtTokens]);

  useAttendedSubscription({
    onData: (options) => {
      if (isToday(selectedAttendanceDate)) refetchEmployeeWorking();
    },
  });

  return (
    <>
      <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-3 pb-0 pr-5">
        <div className="flex mt-0 -mx-3">
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
