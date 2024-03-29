import { useDepartments } from '@/repository/Code';
import { attendanceFilterVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import React, { useEffect } from 'react';
import { Input, Select, initTE } from 'tw-elements';

const AttendanceFilterGroup = () => {
  const deptData = useDepartments();

  const selectedAttendanceFilter = useReactiveVar(attendanceFilterVar);

  useEffect(() => {
    initTE({ Input, Select });
    attendanceFilterVar({ name: '', dept: -1, isDisplayed: false });
  }, []);

  return (
    <div className="flex w-[23rem] text-xs self-center">
      <span className="w-[2rem] self-center text-sm mr-2 font-semibold">이름</span>
      <div className="relative mb-1 w-[10rem] mr-5" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          id="nameFilter"
          placeholder="이름을 입력해주세요"
          onChange={(e) => attendanceFilterVar({ name: e.target.value, dept: selectedAttendanceFilter.dept, isDisplayed: true })}
        />
        <label
          htmlFor="nameFilter"
          className="text-xs pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          이름을 입력해주세요
        </label>
      </div>
      <div className="w-[10rem] text-xs flex">
        <span className="w-[3rem] self-center text-sm font-semibold">부서</span>
        <div className="self-center">
          <select
            data-te-select-init
            data-te-select-filter="true"
            onChange={(e) => attendanceFilterVar({ name: selectedAttendanceFilter.name, dept: parseInt(e.target.value), isDisplayed: true })}
          >
            <option value={-1}>전체</option>
            {deptData?.departments?.map((dept, idx) => (
              <option key={dept?.departmentId} value={dept?.departmentId ?? ''}>
                {dept?.departmentName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default AttendanceFilterGroup;
