import { attendanceSortVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const AttendanceSortGroup = () => {
  const selectedAttendanceSort = useReactiveVar(attendanceSortVar);

  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => {
          attendanceSortVar({ sort: 'name' });
        }}
        className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-900 rounded-l-lg bg-transparent border border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        <FontAwesomeIcon className={(selectedAttendanceSort.sort === 'name' ? 'text-cyan-500' : 'text-zinc-400') + ' mr-1'} icon={faCheck} /> 이름순
      </button>
      <button
        type="button"
        onClick={() => {
          attendanceSortVar({ sort: 'startAt' });
        }}
        className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-900 rounded-r-md bg-transparent border border-l-0 border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-gray-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
      >
        <FontAwesomeIcon className={(selectedAttendanceSort.sort === 'startAt' ? 'text-cyan-500' : 'text-zinc-400') + ' mr-1'} icon={faCheck} />
        출근순
      </button>
    </div>
  );
};

export default AttendanceSortGroup;
