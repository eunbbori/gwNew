import TableHeader from '@/views/attendance/TableHeader';
import TableRows from '@/views/attendance/TableRows';
import { useGetEmployeeWorkingQuery } from '@/types/generated/types';
import DateMemberCnt from '@/views/attendance/DateMemberCnt';
import { toDateFormatWithoutDay } from '@/utils/toDateFormat';
import { useReactiveVar } from '@apollo/client';
import attendanceDate from '@/modules/attendance';

const Attendance = () => {
  const selectedAttendanceDate = useReactiveVar(attendanceDate);

  const { data, loading, error } = useGetEmployeeWorkingQuery({
    variables: {
      dt: toDateFormatWithoutDay(selectedAttendanceDate),
    },
  });

  if (loading) return <p>Loading!!!</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  return (
    <>
      <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
        <div className="flex flex-wrap mt-0 -mx-3">
          <DateMemberCnt cnt={data!.employeeWorking?.length} selectedDate={selectedAttendanceDate} />
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
