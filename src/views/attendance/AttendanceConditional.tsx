import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import format from 'date-fns/format';
import { useEffect, useState } from 'react';
import { Input, Select, initTE } from 'tw-elements';
import { IEmployeeWorkingCondition, useGetEmployeeWorkingConditionalLazyQuery } from '@/types/generated/types';
import { useForm } from 'react-hook-form';
import ConditionalTableHeader from './ConditionalTableHeader';
import ConditionalTableRows from './ConditionalTableRows';
import Paging from '@/components/Paging';
import { attendanceConditionalActivePageVar } from '@/stores/gqlReactVars';
import ConditionalInputs from './ConditionalInputs';
import SelectPageCount from './SelectPageCount';
import Swal from 'sweetalert';
import Spinner from '@/components/Spinner';
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

const AttendanceConditional = () => {
  const [pageCount, setPageCount] = useState<number>(10);
  const handlePageCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setPageCount(Number(selectedValue));
  };

  useEffect(() => {
    handleSubmit(onSearchCondition)();
  }, [pageCount]);

  const { handleSubmit, control } = useForm<ConditionalFormValues>({});

  const [getEmployeeWorkingConditionalQuery, { data, loading }] = useGetEmployeeWorkingConditionalLazyQuery({
    onError: (err) => {
      Swal('ERROR', '', 'error');
    },
  });

  useEffect(() => {
    initTE({ Input, Select });
  }, [loading]);

  const [workingTypeChecked, setWorkingTypeChecked] = useState<string[]>([]);

  const handleWorkingTypeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (workingTypeChecked.includes(value)) {
      setWorkingTypeChecked(workingTypeChecked.filter((type) => type !== value));
    } else {
      setWorkingTypeChecked([...workingTypeChecked, value]);
    }
  };

  const handlePageChange = (page: React.SetStateAction<number>) => {
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

      const { data } = await getEmployeeWorkingConditionalQuery({
        variables: {
          searchCondition: input,
          page: attendanceConditionalActivePageVar(),
          size: pageCount,
        },
        fetchPolicy: 'no-cache',
      });

      const newPage = data?.employeeWorkingConditional?.page ?? 1;
      attendanceConditionalActivePageVar(newPage < 1 ? 1 : newPage);
    } catch (error) {
      Swal('ERROR', '', 'error');
    }
  };

  // if (loading) return <Spinner />;
  // else
  return (
    <>
      <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-3 pb-0 pr-5">
        <form onSubmit={handleSubmit(onSearchCondition)} role="form text-left">
          <ConditionalInputs control={control} handleWorkingTypeChange={handleWorkingTypeChange} />

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
            <SelectPageCount handlePageCountChange={handlePageCountChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendanceConditional;
