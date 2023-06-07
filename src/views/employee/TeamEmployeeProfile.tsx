import TeamProfileList from '@/components/Employee/Profile/TeamProfileList';
import { useGetAllEmployeeQuery } from '@/types/generated/types';
import React from 'react';

const TeamEmployeeProfile = () => {
  const { data } = useGetAllEmployeeQuery();
  return (
    <div className="bg-[white] p-[30px] rounded-xl">
      {data?.departments?.map((dept, idx) => (
        <TeamProfileList key={idx} deptId={dept?.departmentId} deptName={dept?.departmentName} />
      ))}
    </div>
  );
};

export default TeamEmployeeProfile;
