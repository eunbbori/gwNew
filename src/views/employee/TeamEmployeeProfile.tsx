import TeamProfileList from '@/components/Employee/Profile/TeamProfileList';
import { useCodes } from '@/repository/Code';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const TeamEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const positionOptions = useCodes('POSITION');

  return (
    <div className="bg-[white] p-[30px] rounded-xl">
      {list?.departments?.map((dept, idx) => (
        <TeamProfileList key={idx} deptId={dept?.departmentId} deptName={dept?.departmentName} employees={list.employees} positionOptions={positionOptions} />
      ))}
    </div>
  );
};

export default TeamEmployeeProfile;
