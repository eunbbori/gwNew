import TableCell from './TableCell';
import { IGetEmployeeQuery } from '@/types/generated/types';

type TableRowsProps = {
  data: IGetEmployeeQuery;
};

const fmtDate = (dt: Date) =>
  dt && dt.getMonth() + '월' + dt.getDate() + '일 ' + dt.getHours().toString().padStart(2, '0') + ':' + dt.getMinutes().toString().padStart(2, '0');
const calcWorkingTime = (startAt?: Date, endAt?: Date) =>
  startAt &&
  endAt &&
  Math.floor(((+endAt - +startAt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
    '시간 ' +
    Math.floor(((+endAt - +startAt) % (1000 * 60 * 60)) / (1000 * 60)) +
    '분 ';

const TableRows = ({ data }: TableRowsProps) => {
  return (
    <>
      {data.employees!.map((e, id) => {
        const startAt: Date = e && e.startAt && new Date(e.startAt);
        const endAt: Date = e && e.endAt && new Date(e.endAt);

        return (
          <tr key={id}>
            <TableCell cellData={e!['employeeName']} />
            <TableCell cellData={calcWorkingTime(startAt, endAt)} />
            <TableCell cellData={'출근'} />
            <TableCell cellData={fmtDate(startAt)} />
            <TableCell cellData={fmtDate(endAt)} />
            <TableCell cellData={'-'} />
            <TableCell cellData={'-'} />
          </tr>
        );
      })}
    </>
  );
};

export default TableRows;
