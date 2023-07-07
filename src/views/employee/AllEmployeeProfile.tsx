import Profile from '@/components/Employee/Profile/Profile';
import { useCodesMap } from '@/repository/Code';
import { memberDetailIdVar } from '@/stores/gqlReactVars';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const AllEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const positionOptions = useCodesMap('POSITION');

  const clickHandler = (empId: string) => {
    memberDetailIdVar(empId);
  };

  return (
    <div className="bg-[white] p-[30px] rounded-xl flex flex-wrap">
      {list?.employees
        ? list?.employees
            ?.sort((a, b) => {
              if (!a?.name) return 1;
              else if (!b?.name) return -1;
              else if (a?.name > b?.name) return 1;
              else return a?.name < b?.name ? -1 : 0;
            })
            .map((emp, idx) => (
              <Profile
                key={emp?.employeeId}
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
