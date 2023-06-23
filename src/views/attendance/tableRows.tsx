import TableCell from './TableCell';
import { IGetEmployeeWorkingQuery } from '@/types/generated/types';
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

  return (
    <>
      {filteredData
        ?.sort((a, b) => {
          if (selectedAttendanceSort.sort === 'name') {
            if (a?.name && b?.name) {
              return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            }
          } else {
            if (a?.startAt && b?.startAt) {
              return a.startAt < b.startAt ? 1 : a.startAt > b.startAt ? -1 : 0;
            }
          }
          return 0;
        })
        .map((e, id) => {
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
              <TableCell cellData={format(startAt, 'MM-dd HH:mm')} />
              <TableCell cellData={endAt ? format(endAt, 'MM-dd HH:mm') : '-'} />
              <TableCell cellData={'-'} />
              <TableCell cellData={'-'} />
            </tr>
          );
        })}
    </>
  );
};

export default TableRows;
