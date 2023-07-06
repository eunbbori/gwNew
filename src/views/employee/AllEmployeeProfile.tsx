import Profile from '@/components/Employee/Profile/Profile';
import { useCodes } from '@/repository/Code';
import { memberDetailIdVar } from '@/stores/gqlReactVars';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const AllEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const positionOptions = useCodes('POSITION');

  const clickHandler = (empId: string) => {
    memberDetailIdVar(empId);
  };
  return (
    <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
      {list?.employees
        ? list?.employees?.map((emp, idx) => (
            <Profile
              key={idx}
              onClick={() => clickHandler(emp?.userId || '')}
              empName={emp?.name}
              deptName={emp?.department?.departmentName}
              position={emp?.position}
              photoUrl={emp?.photoUrl || ''}
              positionOptions={positionOptions}
            />
          ))
        : 'Not loaded Yet'}
    </div>
  );
};

export default AllEmployeeProfile;
