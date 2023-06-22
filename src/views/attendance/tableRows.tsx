import TableCell from './TableCell';
import { IGetEmployeeWorkingQuery } from '@/types/generated/types';
import { getWorkingTypeName } from '@/repository/Code';
import format from 'date-fns/format';
import { calculateDateDiff } from '@/components/Util/DateUtil';
import { SortColAttendance } from './Attendance';
import { useEffect, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { attendanceFilterVar } from '@/stores/gqlReactVars';

type TableRowsProps = {
  data: IGetEmployeeWorkingQuery | undefined;
  sortCol: SortColAttendance;
};

const TableRows = ({ data, sortCol }: TableRowsProps) => {
  const isDisplayed = useReactiveVar(attendanceFilterVar).isDisplayed;
  const filteredName = useReactiveVar(attendanceFilterVar).name;
  const filteredDept = useReactiveVar(attendanceFilterVar).dept;
  const filteredDeptToString = useReactiveVar(attendanceFilterVar).dept.toString();

  const filteredCondition = isDisplayed && (filteredName?.length > 0 || filteredDeptToString);

  const filteredData = filteredCondition
    ? data?.employeeWorking?.filter((empData) => {
        const isNameMatched = filteredName?.length === 0 || empData?.name === filteredName;
        const isDeptMatched = filteredDept === -1 || empData?.department?.departmentId === filteredDeptToString;
        return isNameMatched && isDeptMatched;
      })
    : data?.employeeWorking;

  const searchedData = filteredData;

  useEffect(() => {
    if (data) {
      console.log('hhhhhhhh: ' + sortCol);

      data = {
        ...data,
        employeeWorking: data.employeeWorking?.sort((a, b) => {
          if (sortCol === 'name') {
            if (a?.name && b?.name) {
              return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            }
          } else {
            if (a?.startAt && b?.startAt) {
              return a.startAt > b.startAt ? 1 : a.startAt < b.startAt ? -1 : 0;
            }
          }
          return 0;
        }),
      };
      /*
      data.employeeWorking = data.employeeWorking?.sort((a, b) => {
        if (sortCol === 'name') {
          if (a?.name && b?.name) {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
          }
        } else {
          if (a?.startAt && b?.startAt) {
            return a.startAt > b.startAt ? 1 : a.startAt < b.startAt ? -1 : 0;
          }
        }
        return 0;
      });*/
    }
  }, [sortCol, data]);

  return (
    <>
      {searchedData?.map((e, id) => {
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
