import TableCell from './TableCell';
import { IGetEmployeeWorkingQuery } from '@/types/generated/types';
import { getWorkingTypeName } from '@/repository/Code';
import format from 'date-fns/format';

const calculateDateDiff = (startAt?: Date, endAt?: Date) =>
  startAt &&
  endAt &&
  Math.floor(((+endAt - +startAt) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
    '시간 ' +
    Math.floor(((+endAt - +startAt) % (1000 * 60 * 60)) / (1000 * 60)) +
    '분 ';

type TableRowsProps = {
  data: IGetEmployeeWorkingQuery | undefined;
};

const TableRows = ({ data }: TableRowsProps) => {
  return (
    <>
      {data?.employeeWorking!.map((e, id) => {
        const startAt: Date = e && e.startAt && new Date(e.startAt);
        const endAt: Date = e && e.endAt && new Date(e.endAt);

        return (
          <tr key={id}>
            <TableCell cellData={e?.employeeName} />
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
