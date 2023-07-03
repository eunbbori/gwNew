import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useReactiveVar } from '@apollo/client';
import format from 'date-fns/format';
import { attendanceConditionalFilterDateVar, attendanceDateVar } from '@/stores/gqlReactVars';
import { useEffect, useState, useRef, use, MutableRefObject } from 'react';
import DatePickerRangeInput from '@/components/Input/DatePickerRangeInput';
import { Input, Select, initTE } from 'tw-elements';
import {
  IEmployeeWorkingCondition,
  useGetAllDepartmentsLazyQuery,
  useGetCodesLazyQuery,
  useGetEmployeeWorkingConditionalLazyQuery,
} from '@/types/generated/types';
export interface IDateMemberCntProps {
  cnt: number | undefined;
}

const ConditionalFilterPart = ({ cnt }: IDateMemberCntProps) => {
  useEffect(() => {
    initTE({ Input, Select });
    getAllDepartmentsQuery();
    getCodesQuery();
  }, []);

  const [getAllDepartmentsQuery, { data: deptData }] = useGetAllDepartmentsLazyQuery();
  const [getCodesQuery, { data: codeData }] = useGetCodesLazyQuery({
    variables: {
      parents: ['POSITION', 'WORKING_TYPE'],
    },
    onError: (err) => {
      alert('err');
    },
  });

  const positionOptions =
    (codeData?.codes &&
      codeData?.codes[0]?.codes
        ?.map((code) => ({
          value: code?.code ?? '',
          label: code?.name ?? '',
        }))
        .reverse()) ??
    [];

  const workingTypeOptions =
    (codeData?.codes &&
      codeData?.codes[1]?.codes?.map((code) => ({
        value: code?.code ?? '',
        label: code?.name ?? '',
      }))) ??
    [];

  const nameRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const deptIdRef = useRef<HTMLSelectElement>(null);
  const positionRef = useRef<HTMLSelectElement>(null);
  const selectedDate = useReactiveVar(attendanceConditionalFilterDateVar);
  const selectedFromDate = selectedDate?.startDate ? format(new Date(selectedDate.startDate), 'yyyy-MM-dd') : null;
  // const selectedFromDate = selectedDate?.startDate ? selectedDate.startDate.toString() : '';
  // const selectedToDate = selectedDate?.endDate ? selectedDate.endDate.toString() : '';
  const selectedToDate = selectedDate?.endDate ? format(new Date(selectedDate.endDate), 'yyyy-MM-dd') : null;

  const [workingTypeChecked, setWorkingTypeChecked] = useState<string[]>([]);

  const handleWorkingTypeChange = (value: string) => {
    if (workingTypeChecked.includes(value)) {
      setWorkingTypeChecked(workingTypeChecked.filter((type) => type !== value));
    } else {
      setWorkingTypeChecked([...workingTypeChecked, value]);
    }
  };

  const condition: IEmployeeWorkingCondition = {
    departmentId: deptIdRef.current?.value,
    // position: positionRef.current?.value,
    name: nameRef.current?.value,
    userId: userIdRef.current?.value,
    workingDateFrom: selectedFromDate,
    workingDateTo: selectedToDate,
    workingType: workingTypeChecked,
  };
  const [useGetEmployeeWorkingConditionalQuery, { refetch, data }] = useGetEmployeeWorkingConditionalLazyQuery({
    variables: {
      searchCondition: condition,
      page: 0,
      size: 10,
    },
    fetchPolicy: 'no-cache',
    onError: (err) => {
      alert('err 조건조회');
    },
  });

  const searchHandler = () => {
    useGetEmployeeWorkingConditionalQuery();
    console.log('검색');
    console.log('data', data?.employeeWorkingConditional);
  };

  return (
    <>
      <div className="relative flex w-full px-3 mt-0">
        <p className="basis-1/2 mb-0 mr-5 w-30 leading-8 text-sm">
          <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체 <span className="ml-1 font-semibold">{cnt}</span> 명
        </p>
        <div className="flex justify-end basis-1/2">
          <button
            type="button"
            className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 mr-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={searchHandler}
            className="mr-[30px] inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            조회
          </button>
        </div>
      </div>
      <div className="relative flex flex-wrap px-3 mt-0">
        <div className="mt-[10px] -ml-3 py-3 rounded-lg bg-gray-100 p-6 w-full">
          <DatePickerRangeInput name={'dateRange'} title={'기간'} />
          <div className="flex flex-wrap mt-5">
            <div className="flex">
              <p className="text-sm font-bold text-[#484848] self-center mr-5">이름</p>
              <div className="relative mb-1 w-[12rem] h-[2rem] mr-5" data-te-input-wrapper-init>
                <input
                  ref={nameRef}
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="nameFilter"
                  placeholder="이름을 입력해주세요"
                />
                <label
                  htmlFor="nameFilter"
                  className="text-sm pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  이름을 입력해주세요
                </label>
              </div>
            </div>
            <div className="flex">
              <p className="text-sm font-bold text-[#484848] self-center mr-5">아이디</p>
              <div className="relative mb-1 w-[12rem] mr-5 h-[2rem]" data-te-input-wrapper-init>
                <input
                  ref={userIdRef}
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="idFilter"
                  placeholder="아이디를 입력해주세요"
                />
                <label
                  htmlFor="idFilter"
                  className="text-sm pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  아이디를 입력해주세요
                </label>
              </div>
            </div>
            <div className="flex">
              <p className="text-sm font-bold text-[#484848] self-center mr-5">부서</p>
              <div className="w-[10rem] text-xs self-center mr-5">
                <select ref={deptIdRef} data-te-select-init data-te-select-filter="true">
                  <option value={-1}>전체</option>
                  {deptData?.departments?.map((dept, idx) => (
                    <option key={idx} value={dept?.departmentId ?? ''}>
                      {dept?.departmentName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex">
              <p className="text-sm font-bold text-[#484848] self-center mr-5">직급</p>
              <div className="w-[10rem] text-xs self-center">
                <select ref={positionRef} data-te-select-init data-te-select-filter="true">
                  <option value={-1}>전체</option>
                  {positionOptions?.map((position, idx) => (
                    <option key={idx} value={position?.value ?? ''}>
                      {position?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* 근무형태 중복 체크박스 */}
          <div className="flex mt-5">
            <p className="text-sm font-bold text-[#484848] self-center mr-5">근무 형태</p>
            <div className="flex justify-center">
              {workingTypeOptions.map((workType, idx) => (
                <div key={idx} className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    onChange={() => handleWorkingTypeChange(workType.value)}
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    id={`workingType${idx}`}
                    value={workType.value}
                  />
                  <label className="inline-block text-sm pl-[0.15rem] hover:cursor-pointer" htmlFor={`workingType${idx}`}>
                    {workType.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConditionalFilterPart;
