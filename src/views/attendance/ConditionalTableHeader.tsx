import { attendanceSortVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IAttendanceHeader {
  title: string;
  field: string;
  isSortable: boolean;
}

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

export default ConditionalTableHeader;
