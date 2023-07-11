import TableCell from './TableCell';
import { IEmployeeWorking, IGetEmployeeWorkingQuery } from '@/types/generated/types';
import { useCodesMap } from '@/repository/Code';
import format from 'date-fns/format';
import { calculateDateDiff } from '@/components/Util/DateUtil';
import { attendanceSortVar, attendanceFilterVar, attendanceTotalCntVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';

type TableRowsProps = {
  data: IGetEmployeeWorkingQuery | undefined;
};

const TableRows = ({ data }: TableRowsProps) => {
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);
  const selectedAttendanceFilter = useReactiveVar(attendanceFilterVar);

  const positionCodes = useCodesMap('POSITION');
  const workingTypeCodes = useCodesMap('WORKING_TYPE');

  const filteredDeptToString = selectedAttendanceFilter.dept.toString();

  const filteredCondition = selectedAttendanceFilter.isDisplayed && (selectedAttendanceFilter.name?.length > 0 || filteredDeptToString);

  const filteredData = filteredCondition
    ? data?.employeeWorking?.filter((empData) => {
        const isNameMatched = selectedAttendanceFilter.name?.length === 0 || empData?.name?.includes(selectedAttendanceFilter.name);
        const isDeptMatched = selectedAttendanceFilter.dept === -1 || empData?.department?.departmentId === filteredDeptToString;
        return isNameMatched && isDeptMatched;
      })
    : data?.employeeWorking;

  const fileteredDuraAddedData = filteredData?.map((e) => {
    const startAt: Date = e && e.startAt && new Date(e.startAt);
    const endAt: Date = e && e.endAt && new Date(e.endAt);
    const positionName = e && e.position && positionCodes.get(e.position);
    return { ...e, startAt, endAt, positionName, duration: calculateDateDiff(startAt, endAt) };
  });
  attendanceTotalCntVar(filteredData?.length);

  const sortedData = fileteredDuraAddedData?.sort((a, b) => {
    type AttendanceSortVarKey = keyof IEmployeeWorking;
    const currSort = selectedAttendanceSort.sort as AttendanceSortVarKey;
    const isDepartment = selectedAttendanceSort.sort === 'department';

    if (!a || !b) {
      return 0;
    }

    let sortVal = 0;
    if (!a[currSort]) {
      sortVal = -1;
    } else if (!b[currSort]) {
      sortVal = 1;
    } else {
      const prev = isDepartment ? a[currSort]['departmentName'] : a[currSort];
      const next = isDepartment ? b[currSort]['departmentName'] : b[currSort];

      if (prev > next) {
        sortVal = 1;
      } else if (prev < next) {
        sortVal = -1;
      }
    }

    return selectedAttendanceSort.isAscending ? sortVal : sortVal * -1;
  });

  return (
    <>
      {sortedData &&
        sortedData.map((e, id) => {
          return (
            <tr key={e?.userId}>
              <TableCell cellData={e?.name} />
              <TableCell cellData={e?.userId} />
              <TableCell cellData={e?.department?.departmentName} />
              <TableCell cellData={e?.positionName} />
              <TableCell cellData={e.duration} />
              <TableCell cellData={workingTypeCodes.get(e?.workingType ?? '')} />
              <TableCell cellData={e.startAt ? format(e.startAt, 'MM-dd HH:mm') : '-'} />
              <TableCell cellData={e.endAt ? format(e.endAt, 'MM-dd HH:mm') : '-'} />
            </tr>
          );
        })}
    </>
  );
};
export default TableRows;
