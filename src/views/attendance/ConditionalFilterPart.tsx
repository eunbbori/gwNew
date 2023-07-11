import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import DatePickerRangeInput from '@/components/Input/DatePickerRangeInput';
import { Input, Select, initTE } from 'tw-elements';
import { IEmployeeWorkingCondition, useGetEmployeeWorkingConditionalLazyQuery } from '@/types/generated/types';
import { useForm } from 'react-hook-form';
import TextInput from '@/components/Input/TextInput';
import SelectInput from '@/components/Input/SelectInput';
import ConditionalTableHeader from './ConditionalTableHeader';
import ConditionalTableRows from './ConditionalTableRows';
import CheckBoxInput from '@/components/Input/CheckBoxInput';
import Paging from '@/components/Paging';
import { attendanceConditionalActivePageVar } from '@/stores/gqlReactVars';
import { useCodesOption, useDepartmentsOption } from '@/repository/Code';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
export interface ConditionalFormValues {
  dateRange: DateRange;
  workingDateFrom: string;
  workingDateTo: string;
  name: string;
  userId: string;
  departmentId: string;
  position: string;
  workingType: string[];
}

const ConditionalFilterPart = () => {
  const [pageCount, setPageCount] = useState<number>(10);
  const handlePageCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setPageCount(Number(selectedValue));
  };

  useEffect(() => {
    initTE({ Input, Select });
    handleSubmit(onSearchCondition)();
  }, [pageCount]);

  const inputClassName =
    'text-[14px] py-[0.32rem] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full mr-5 appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
  const paragraphClassName = 'w-1/5 text-sm text-[#484848] self-center';
  // const paragraphClassName2 = 'w-[5%] text-sm text-[#484848] self-center';
  const deptOptions = [{ value: '-1', label: '전체' }, ...useDepartmentsOption()];
  const positionOptions = [{ value: '', label: '전체' }, ...useCodesOption('POSITION').reverse()];
  const workingTypeOptions = useCodesOption('WORKING_TYPE');

  const { handleSubmit, control } = useForm<ConditionalFormValues>({});

  const [getEmployeeWorkingConditionalQuery, { data }] = useGetEmployeeWorkingConditionalLazyQuery({
    onError: (err) => {
      alert('err 조건조회');
    },
  });

  const [workingTypeChecked, setWorkingTypeChecked] = useState<string[]>([]);

  const handleWorkingTypeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    console.log('vaaaaaaa=' + value);
    if (workingTypeChecked.includes(value)) {
      setWorkingTypeChecked(workingTypeChecked.filter((type) => type !== value));
    } else {
      setWorkingTypeChecked([...workingTypeChecked, value]);
    }
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
    console.log('페이지네이션:' + page);
    attendanceConditionalActivePageVar(page.valueOf() as number);
    handleSubmit(onSearchCondition)();
  };

  const onSearchCondition = async (inputData: ConditionalFormValues) => {
    try {
      const { dateRange, ...newInputData } = inputData;
      const input: IEmployeeWorkingCondition = {
        ...newInputData,
        workingDateFrom: dateRange?.startDate ? format(new Date(dateRange.startDate), 'yyyy-MM-dd') : null,
        workingDateTo: dateRange?.endDate ? format(new Date(dateRange.endDate), 'yyyy-MM-dd') : null,
        workingType: workingTypeChecked,
      };

      console.log('get page=' + attendanceConditionalActivePageVar());
      const { data } = await getEmployeeWorkingConditionalQuery({
        variables: {
          searchCondition: input,
          page: attendanceConditionalActivePageVar(),
          size: pageCount,
        },
        fetchPolicy: 'no-cache',
      });

      const newPage = data?.employeeWorkingConditional?.page ?? 1;
      attendanceConditionalActivePageVar(newPage);
    } catch (error) {
      alert('err 조건조회');
    }
  };

  return (
    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-3 pb-0 pr-5">
      <form onSubmit={handleSubmit(onSearchCondition)} role="form text-left">
        <div className="relative flex flex-wrap px-3 mt-0">
          <div className="mt-[10px] -ml-3 py-3 rounded-lg bg-gray-100 p-6 w-full">
            <DatePickerRangeInput name="dateRange" control={control} title="기간" defaultValue={{ startDate: new Date(), endDate: new Date() }} />
            <div className="flex flex-wrap mt-5">
              <div className="w-1/4">
                <TextInput
                  name="name"
                  title="이름"
                  control={control}
                  placeHolder="이름을 입력해주세요"
                  type="text"
                  inputClassName={inputClassName}
                  divClassName="flex"
                  paragraphClassName={paragraphClassName}
                />
              </div>
              <div className="w-1/4">
                <TextInput
                  name="userId"
                  title="아이디"
                  control={control}
                  placeHolder="아이디를 입력해주세요"
                  type="text"
                  inputClassName={inputClassName}
                  divClassName="flex"
                  paragraphClassName={paragraphClassName}
                />
              </div>
              <div className="w-1/4">
                <SelectInput
                  name="departmentId"
                  control={control}
                  selectOptions={deptOptions}
                  title="부서"
                  placeHolder="부서를 선택해주세요"
                  paragraphClassName={paragraphClassName}
                  divClassName="flex"
                />
              </div>
              <div className="w-1/4">
                <SelectInput
                  name="position"
                  control={control}
                  selectOptions={positionOptions}
                  title="직급"
                  placeHolder="직급을 선택해주세요"
                  paragraphClassName={paragraphClassName}
                  divClassName="flex"
                />
              </div>
            </div>
            {/* 근무형태 중복 체크박스 */}
            <div className="flex mt-5">
              <CheckBoxInput control={control} name="workingType" title="근무 형태" onChange={handleWorkingTypeChange} options={workingTypeOptions} />
            </div>
          </div>
        </div>

        <div className="relative flex w-full px-3 my-3">
          <p className="basis-1/2 mb-0 mr-5 w-30 leading-8 text-sm">
            <FontAwesomeIcon className="text-cyan-500" icon={faCheck} /> 전체{' '}
            <span className="ml-1 font-semibold">{data?.employeeWorkingConditional?.totalElements ?? 0}</span> 명
          </p>
          <div className="flex justify-end basis-1/2">
            {/* <button
              type="button"
              className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 mr-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
            >
              초기화
            </button> */}
            <button
              type="submit"
              className="mr-[30px] inline-block rounded bg-primary px-6 py-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            >
              조회
            </button>
          </div>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
          <ConditionalTableHeader />
          <tbody>
            <ConditionalTableRows data={data} />
          </tbody>
        </table>
      </div>
      <div className="flex mt-4">
        <div className="w-[10%] mr-auto" />
        <div className="flex mt-4">
          <Paging
            perPage={pageCount}
            paging={attendanceConditionalActivePageVar()}
            onHandler={handlePageChange}
            totalCount={data?.employeeWorkingConditional?.totalElements || undefined}
          />
        </div>
        <div className="w-[10%] ml-auto self-center">
          <select data-te-select-init data-te-select-size="sm" onChange={handlePageCountChange}>
            <option value="5">5개씩 보기</option>
            <option value="10" selected>
              10개씩 보기
            </option>
            <option value="20">20개씩 보기</option>
            <option value="30">30개씩 보기</option>
            <option value="50">50개씩 보기</option>
          </select>
          <label data-te-select-label-ref>페이지</label>
        </div>
      </div>
    </div>
  );
};

export default ConditionalFilterPart;
