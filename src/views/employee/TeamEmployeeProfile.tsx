import TeamProfileList from '@/components/Employee/Profile/TeamProfileList';
import { IGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const TeamEmployeeProfile = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  return (
    <div className="bg-[white] p-[30px] rounded-xl">
      {list?.departments?.map((dept, idx) => (
        <TeamProfileList key={idx} deptId={dept?.departmentId} deptName={dept?.departmentName} />
      ))}
    </div>
  );
};

export default TeamEmployeeProfile;
