import TableCell from './TableCell';
import { IEmployeeWorking, IGetEmployeeWorkingConditionalQuery } from '@/types/generated/types';
import { getWorkingTypeName } from '@/repository/Code';
import format from 'date-fns/format';
import { calculateDateDiff } from '@/components/Util/DateUtil';
import { attendanceSortVar, attendanceFilterVar, attendanceConditionalTotalCntVar } from '@/stores/gqlReactVars';
import { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';

type TableRowsProps = {
  data: IGetEmployeeWorkingConditionalQuery | undefined;
};

const ConditionalTableRows = ({ data }: TableRowsProps) => {
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);
  const filteredData = data?.employeeWorkingConditional?.content;

  const fileteredDuraAddedData = filteredData?.map((e) => {
    const startAt: Date = e && e.startAt && new Date(e.startAt);
    const endAt: Date = e && e.endAt && new Date(e.endAt);
    return { ...e, startAt, endAt, duration: calculateDateDiff(startAt, endAt) };
  });
  attendanceConditionalTotalCntVar(filteredData?.length);

  const sortedData = fileteredDuraAddedData?.sort((a, b) => {
    type AttendanceSortVarKey = keyof IEmployeeWorking;
    const currSort = selectedAttendanceSort.sort as AttendanceSortVarKey;
    const isDepartment = selectedAttendanceSort.sort === 'department';
    // console.log('sortedData', sortedData);

    if (a && b) {
      if (!a[currSort]) {
        return selectedAttendanceSort.isAscending ? -1 : 1;
      } else if (!b[currSort]) {
        return selectedAttendanceSort.isAscending ? 1 : -1;
      } else {
        const prev = isDepartment ? a[currSort]['departmentName'] : a[currSort];
        const next = isDepartment ? b[currSort]['departmentName'] : b[currSort];

        if (prev > next) {
          return selectedAttendanceSort.isAscending ? 1 : -1;
        } else if (prev < next) {
          return selectedAttendanceSort.isAscending ? -1 : 1;
        }
      }
    }

    return 0;
  });

  return (
    <>
      {sortedData &&
        sortedData.map((e, id) => {
          console.log('name=' + e?.name + ', startAt=' + e?.startAt);

          return (
            <tr key={e?.userId}>
              <TableCell cellData={e?.name} />
              <TableCell cellData={e?.userId} />
              <TableCell cellData={e?.department?.departmentName} />
              <TableCell cellData={e.duration} />
              <TableCell cellData={getWorkingTypeName(e?.workingType)} />
              <TableCell cellData={e.startAt ? format(e.startAt, 'MM-dd HH:mm') : '-'} />
              <TableCell cellData={e.endAt ? format(e.endAt, 'MM-dd HH:mm') : '-'} />
            </tr>
          );
        })}
    </>
  );
};
export default ConditionalTableRows;
