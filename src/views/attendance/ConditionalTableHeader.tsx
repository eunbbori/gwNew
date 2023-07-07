import TableHeader, { IAttendanceHeader } from './TableHeader';

const headers: IAttendanceHeader[] = [
  { title: '날짜', field: 'workingDate', isSortable: false },
  { title: '이름', field: 'name', isSortable: false },
  { title: 'ID', field: 'userId', isSortable: false },
  { title: '부서', field: 'department', isSortable: false },
  { title: '직급', field: 'positionName', isSortable: false },
  { title: '근무시간', field: 'duration', isSortable: false },
  { title: '근태', field: 'workingType', isSortable: false },
  { title: '출근시간', field: 'startAt', isSortable: false },
  { title: '퇴근시간', field: 'endAt', isSortable: false },
];
const ConditionalTableHeader = () => {
  return <TableHeader headers={headers} />;
};

export default ConditionalTableHeader;
