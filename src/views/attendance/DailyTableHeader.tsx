import TableHeader, { IAttendanceHeader } from './TableHeader';

const headers: IAttendanceHeader[] = [
  { title: '이름', field: 'name', isSortable: true },
  { title: 'ID', field: 'userId', isSortable: true },
  { title: '부서', field: 'department', isSortable: true },
  { title: '직급', field: 'positionName', isSortable: true },
  { title: '근무시간', field: 'duration', isSortable: true },
  { title: '근태', field: 'workingType', isSortable: true },
  { title: '출근시간', field: 'startAt', isSortable: true },
  { title: '퇴근시간', field: 'endAt', isSortable: true },
];

const DailyTableHeader = () => {
  return <TableHeader headers={headers} />;
};

export default DailyTableHeader;
