import { IGetEmployeeQuery } from '@/types/generated/types';
import TableCell from './tableCell';

type TableRowsProps = {
  data: IGetEmployeeQuery;
};

const TableRows = ({ data }: TableRowsProps) => {
  console.log('data', data);
  console.log('data.employees', data.employees);
  console.log('data.employees[0]', data?.employees![0]);
  console.log('data.employees[0]', data?.employees![0]!['employeeName']);

  return (
    <>
      {data.employees!.map((e, id) => (
        <tr key={id}>
          <TableCell cellData={e!['employeeName']} />
          <TableCell cellData={''} />
          <TableCell cellData={'출근'} />
          <TableCell cellData={e!['startAt']} />
          <TableCell cellData={e!['endAt']} />
          <TableCell cellData={'-'} />
          <TableCell cellData={'-'} />
        </tr>
      ))}
    </>
  );
};

export default TableRows;
