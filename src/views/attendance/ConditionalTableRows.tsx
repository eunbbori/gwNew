import TableCell from './TableCell';
import { IGetEmployeeWorkingConditionalQuery } from '@/types/generated/types';
import { useCodesMap } from '@/repository/Code';
import format from 'date-fns/format';
import { calculateDateDiff } from '@/components/Util/DateUtil';

type TableRowsProps = {
  data: IGetEmployeeWorkingConditionalQuery | undefined;
};

const ConditionalTableRows = ({ data }: TableRowsProps) => {
  const workingData = data?.employeeWorkingConditional?.content;

  const workingDuraAddedData = workingData?.map((e) => {
    const startAt: Date = e && e.startAt && new Date(e.startAt);
    const endAt: Date = e && e.endAt && new Date(e.endAt);
    const workingDate = e && e.workingDate && format(new Date(e.workingDate), 'yyyy-MM-dd');
    return { ...e, workingDate, startAt, endAt, duration: calculateDateDiff(startAt, endAt) };
  });

  const positionCodes = useCodesMap('POSITION');
  const workingTypeCodes = useCodesMap('WORKING_TYPE');

  return (
    <>
      {workingDuraAddedData &&
        workingDuraAddedData.map((e, id) => {
          return (
            <tr key={e?.userId + ':' + e?.workingDate}>
              <TableCell cellData={e?.workingDate} />
              <TableCell cellData={e?.name} />
              <TableCell cellData={e?.userId} />
              <TableCell cellData={e?.department?.departmentName} />
              <TableCell cellData={positionCodes.get(e?.position ?? '')} />
              <TableCell cellData={e.duration} />
              <TableCell cellData={e?.workingType ? workingTypeCodes.get(e?.workingType ?? '') : '-'} />
              <TableCell cellData={e.startAt ? format(e.startAt, 'MM-dd HH:mm') : '-'} />
              <TableCell cellData={e.endAt ? format(e.endAt, 'MM-dd HH:mm') : '-'} />
            </tr>
          );
        })}
    </>
  );
};
export default ConditionalTableRows;
