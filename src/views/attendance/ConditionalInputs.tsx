import CheckBoxInput from '@/components/Input/CheckBoxInput';
import DatePickerRangeInput from '@/components/Input/DatePickerRangeInput';
import SelectInput from '@/components/Input/SelectInput';
import TextInput from '@/components/Input/TextInput';
import { useCodesOption, useDepartmentsOption } from '@/repository/Code';

const inputClassName =
  'text-[14px] py-[0.32rem] text-[#484848] bg-[#fafafa] focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full mr-5 appearance-none rounded-[4px] border-2 border-solid border-[#e8e8e8] bg-clip-padding py-2 px-3 font-normal transition-all focus:border-fuchsia-200 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow';
const paragraphClassName = 'w-1/5 text-sm text-[#484848] self-center font-bold';

const ConditionalInputs = (args: { handleWorkingTypeChange: (e: React.FormEvent<HTMLInputElement>) => void }) => {
  const defaultInputAttributes = {
    optional: true,
    inputClassName,
    divClassName: 'flex',
    paragraphClassName,
  };

  const defaultSelectAttributes = {
    optional: true,
    divClassName: 'flex',
    paragraphClassName,
  };

  const deptOptions = [{ value: '-1', label: '전체' }, ...useDepartmentsOption()];
  const positionOptions = [{ value: '', label: '전체' }, ...useCodesOption('POSITION')];
  const workingTypeOptions = useCodesOption('WORKING_TYPE');

  return (
    <div className="relative flex flex-wrap px-3 mt-0">
      <div className="mt-[10px] -ml-3 py-3 rounded-lg bg-gray-100 p-6 w-full">
        <DatePickerRangeInput name="dateRange" title="기간" defaultValue={{ startDate: new Date(), endDate: new Date() }} />
        <div className="flex flex-wrap mt-5">
          <div className="w-1/4">
            <TextInput name="name" title="이름" placeHolder="이름을 입력해주세요" {...defaultInputAttributes} />
          </div>
          <div className="w-1/4">
            <TextInput name="userId" title="아이디" placeHolder="아이디를 입력해주세요" {...defaultInputAttributes} />
          </div>
          <div className="w-1/4">
            <SelectInput name="departmentId" selectOptions={deptOptions} title="부서" placeHolder="부서를 선택해주세요" {...defaultSelectAttributes} />
          </div>
          <div className="w-1/4">
            <SelectInput name="position" selectOptions={positionOptions} title="직급" placeHolder="직급을 선택해주세요" {...defaultSelectAttributes} />
          </div>
        </div>
        {/* 근무형태 중복 체크박스 */}
        <div className="flex mt-5">
          <CheckBoxInput name="workingType" title="근무 형태" onChange={args.handleWorkingTypeChange} options={workingTypeOptions} />
        </div>
      </div>
    </div>
  );
};

export default ConditionalInputs;
