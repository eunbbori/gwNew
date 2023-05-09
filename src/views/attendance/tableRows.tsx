import { IGetEmployeeQuery } from '@/types/generated/types';
import TableCell from './tableCell';

type TableRowsProps = {
  data: IGetEmployeeQuery;
};

const TableRows = ({ data }: TableRowsProps) => {
  return (
    <>
      {data.employees!.map((e, id) => {
        const startAt: Date = e && e.startAt && new Date(e.startAt);
        const endAt: Date = e && e.endAt && new Date(e.endAt);

        const startTm =
          startAt &&
          startAt.getMonth() +
            '월' +
            startAt.getDate() +
            '일 ' +
            startAt.getHours().toString().padStart(2, '0') +
            ':' +
            startAt.getMinutes().toString().padStart(2, '0');
        const endTm =
          endAt &&
          endAt.getMonth() +
            '월' +
            endAt.getDate() +
            '일 ' +
            endAt.getHours().toString().padStart(2, '0') +
            ':' +
            endAt.getMinutes().toString().padStart(2, '0');

        return (
          <tr key={id}>
            <TableCell cellData={e!['employeeName']} />
            <TableCell cellData={''} />
            <TableCell cellData={'출근'} />
            <TableCell cellData={startTm} />
            <TableCell cellData={endTm} />
            <TableCell cellData={'-'} />
            <TableCell cellData={'-'} />
          </tr>
        );
      })}
    </>
  );
};

export default TableRows;
