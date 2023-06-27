import Profile from '@/components/Employee/Profile/Profile';
import { memberDetailId } from '@/stores/gqlReactVars';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const AllEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const clickHandler = (empId: string) => {
    memberDetailId(empId);
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
            />
          ))
        : 'Not loaded Yet'}
    </div>
  );
};

export default AllEmployeeProfile;
