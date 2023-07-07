import { attendanceSortVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IAttendanceHeader {
  title: string;
  field: string;
  isSortable: boolean;
}

export interface ITableHeader {
  headers: IAttendanceHeader[];
}

const TableHeader = ({ headers }: ITableHeader) => {
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);

  return (
    <thead className="align-bottom">
      <tr>
        {headers.map((e, id) => (
          <th
            key={e.field}
            style={{ width: '10%' }}
            className={
              (e.isSortable ? 'cursor-pointer' : '') +
              ' px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70'
            }
            onClick={() => {
              e.isSortable &&
                attendanceSortVar({
                  sort: e.field,
                  isAscending: selectedAttendanceSort.sort !== e.field ? true : !selectedAttendanceSort.isAscending,
                });
            }}
          >
            {e.title}
            {e.isSortable && (
              <FontAwesomeIcon
                className={'ml-5 ' + (selectedAttendanceSort.sort !== e.field ? 'text-cyan-500' : 'text-rose-500')}
                icon={selectedAttendanceSort.sort !== e.field ? faSort : selectedAttendanceSort.isAscending ? faSortAsc : faSortDesc}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
