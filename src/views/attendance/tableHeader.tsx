import { attendanceSortVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IAttendanceHeader {
  title: string;
  field: string;
}

const headers: IAttendanceHeader[] = [
  { title: '이름', field: 'name' },
  { title: 'ID', field: 'userId' },
  { title: '부서', field: 'department' },
  { title: '근무시간', field: 'duration' },
  { title: '근태', field: 'workingType' },
  { title: '출근시간', field: 'startAt' },
  { title: '퇴근시간', field: 'endAt' },
];

const TableHeader = () => {
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);

  return (
    <thead className="align-bottom">
      <tr>
        {headers.map((e, id) => (
          <th
            key={e.field}
            className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70"
            onClick={() => {
              !['department', 'duration'].includes(e.field) &&
                attendanceSortVar({ sort: e.field, isAscending: selectedAttendanceSort.sort !== e.field ? true : !selectedAttendanceSort.isAscending });
            }}
          >
            {e.title}
            {!['department', 'duration'].includes(e.field) && (
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
