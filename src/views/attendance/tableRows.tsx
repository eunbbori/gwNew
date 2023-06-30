import TableCell from './TableCell';
import { IEmployeeWorking, IGetEmployeeWorkingQuery } from '@/types/generated/types';
import { getWorkingTypeName } from '@/repository/Code';
import format from 'date-fns/format';
import { calculateDateDiff } from '@/components/Util/DateUtil';
import { attendanceSortVar, attendanceFilterVar, attendanceTotalCntVar } from '@/stores/gqlReactVars';
import { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';

type TableRowsProps = {
  data: IGetEmployeeWorkingQuery | undefined;
};

const TableRows = ({ data }: TableRowsProps) => {
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);
  const selectedAttendanceFilter = useReactiveVar(attendanceFilterVar);

  const filteredDeptToString = selectedAttendanceFilter.dept.toString();

  const filteredCondition = selectedAttendanceFilter.isDisplayed && (selectedAttendanceFilter.name?.length > 0 || filteredDeptToString);

  const filteredData = filteredCondition
    ? data?.employeeWorking?.filter((empData) => {
        const isNameMatched = selectedAttendanceFilter.name?.length === 0 || empData?.name?.includes(selectedAttendanceFilter.name);
        const isDeptMatched = selectedAttendanceFilter.dept === -1 || empData?.department?.departmentId === filteredDeptToString;
        return isNameMatched && isDeptMatched;
      })
    : data?.employeeWorking;

  attendanceTotalCntVar(filteredData?.length);

  const sortedData = filteredData?.sort((a, b) => {
    type AttendanceSortVarKey = keyof IEmployeeWorking;
    const currSort = selectedAttendanceSort.sort as AttendanceSortVarKey;

    if (a && b) {
      if (!a[currSort]) {
        return selectedAttendanceSort.isAscending ? -1 : 1;
      } else if (!b[currSort]) {
        return selectedAttendanceSort.isAscending ? 1 : -1;
      } else {
        if (a[currSort] > b[currSort]) {
          return selectedAttendanceSort.isAscending ? 1 : -1;
        } else if (a[currSort] < b[currSort]) {
          return selectedAttendanceSort.isAscending ? -1 : 1;
        }
      }
    }
    /*  } else if (a && !b) {
      return selectedAttendanceSort.isAscending ? 1 : -1;
    } else if (!a && b) {
      return selectedAttendanceSort.isAscending ? -1 : 1;
    } */
    return 0;
  });

  return (
    <>
      {sortedData &&
        sortedData.map((e, id) => {
          console.log('name=' + e?.name + ', startAt=' + e?.startAt);

          const startAt: Date = e && e.startAt && new Date(e.startAt);
          const endAt: Date = e && e.endAt && new Date(e.endAt);

          return (
            <tr key={e?.userId}>
              <TableCell cellData={e?.name} />
              <TableCell cellData={e?.userId} />
              <TableCell cellData={e?.department?.departmentName} />
              <TableCell cellData={calculateDateDiff(startAt, endAt)} />
              <TableCell cellData={getWorkingTypeName(e?.workingType)} />
              <TableCell cellData={startAt ? format(startAt, 'MM-dd HH:mm') : '-'} />
              <TableCell cellData={endAt ? format(endAt, 'MM-dd HH:mm') : '-'} />
            </tr>
          );
        })}
    </>
  );
};
export default TableRows;
