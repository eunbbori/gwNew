import { attendanceSortVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import SortIcon from '../common/SortIcon';
import { useUserToken } from '@/repository/AccessToken';

export interface IAttendanceHeader {
  title: string;
  field: string;
  isSortable: boolean;
}

export interface ITableHeader {
  headers: IAttendanceHeader[];
}

const TableHeader = ({ headers }: ITableHeader) => {
  const useUserInfo = useUserToken();
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);

  return (
    <thead className="align-bottom">
      <tr>
        {headers.map((e, id) => {
          return (
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
                    isAscending: selectedAttendanceSort.sort !== e.field || !selectedAttendanceSort.isAscending,
                  });
              }}
            >
              {e.title}
              {e.isSortable && <SortIcon selectedSort={selectedAttendanceSort} field={e.field} />}
            </th>
          );
        })}
        <th
          key="__modify_attendance__"
          style={{ width: '10%' }}
          className={
            'px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70'
          }
        >
          {useUserInfo?.adminYn === 'YES' && '수정'}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
