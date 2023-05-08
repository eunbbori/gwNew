import TableCell from './tableCell';

export interface ITableRowsProps {
  name: string;
  workingTime?: string; // -> number
  status?: string; // -> enum
  startTm?: string; // -> Date
  endTm?: string; // -> Date
  extendedTm?: string; // -> number
  nightTm?: string; // -> number
}

const attendanceData: ITableRowsProps[] = [
  {
    name: '홍길동',
    workingTime: '08:00',
    status: '출근',
    startTm: '09:10',
    endTm: '06:10',
  },
  {
    name: '손흥민',
    workingTime: '07:30',
    status: '지각',
    startTm: '09:10',
    endTm: '06:10',
  },
  {
    name: '마이클 잭슨',
    workingTime: '06:00',
    status: '출근',
    startTm: '09:10',
    endTm: '06:10',
  },
  {
    name: '임꺽정',
    workingTime: '08:00',
    status: '지각',
    startTm: '09:10',
    endTm: '06:10',
  },
  {
    name: 'BTS',
    workingTime: '08:00',
    status: '연차',
    startTm: '09:10',
    endTm: '06:10',
  },
  {
    name: '이순신',
    workingTime: '10:00',
    status: '출근',
    startTm: '09:10',
    endTm: '06:10',
  },
];

const TableRows = () => {
  return (
    <>
      {attendanceData.map((e, id) => (
        <tr key={id}>
          <TableCell cellData={e['name']} />
          <TableCell cellData={e.workingTime} />
          <TableCell cellData={e.status} />
          <TableCell cellData={e.startTm} />
          <TableCell cellData={e.endTm} />
          <TableCell cellData={e.extendedTm} />
          <TableCell cellData={e.nightTm} />
        </tr>
      ))}
    </>
  );
};

export default TableRows;
