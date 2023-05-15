import TableCell from './TableCell';
import { IGetEmployeeWorkingQuery } from '@/types/generated/types';
import { getWorkingTypeName } from '@/repository/Code';
import { calculateDateDiff, toDateTimeWithoutYear } from '@/utils/toDateFormat';

type TableRowsProps = {
  data: IGetEmployeeWorkingQuery | undefined;
};

const TableRows = ({ data }: TableRowsProps) => {
  return (
    <>
      {data!.employeeWorking!.map((e, id) => {
        const startAt: Date = e && e.startAt && new Date(e.startAt);
        const endAt: Date = e && e.endAt && new Date(e.endAt);

        return (
          <tr key={id}>
            <TableCell cellData={e?.employeeName} />
            <TableCell cellData={e?.userId} />
            <TableCell cellData={e?.department?.departmentName} />
            <TableCell cellData={calculateDateDiff(startAt, endAt)} />
            <TableCell cellData={getWorkingTypeName(e?.workingType)} />
            <TableCell cellData={toDateTimeWithoutYear(startAt)} />
            <TableCell cellData={toDateTimeWithoutYear(endAt)} />
            <TableCell cellData={'-'} />
            <TableCell cellData={'-'} />
          </tr>
        );
      })}
    </>
  );
};

export default TableRows;
