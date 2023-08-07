import { IGetAllEmployeeQuery } from '@/types/generated/types';
import AllEmployeeProfile from './AllEmployeeProfile';
import TeamEmployeeProfile from './TeamEmployeeProfile';
import TabbedContent, { ITabbedContent } from '../common/TabbedContent';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';
import DetailModal from '@/components/Modal/DetailModal';
import MemberModalContent from '@/components/Employee/Detail/MemberModalContent';

interface IMemberIds {
  userId: string;
  empId: number;
}

interface IMemberDetail {
  memberDetail: IMemberIds;
  setMemberDetail: Dispatch<SetStateAction<IMemberIds>>;
}

export const MemberDetailContext = createContext<IMemberDetail | null>(null);

const EmployeeTab = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const [memberDetail, setMemberDetail] = useState({
    userId: '',
    empId: 0,
  });

  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp']);
  }, []);

  const attendanceTabList: ITabbedContent[] = [
    {
      title: '팀별',
      id: 'tabs-employees-team',
      content: <TeamEmployeeProfile list={list} />,
    },
    {
      title: '전체',
      id: 'tabs-employees-total',
      content: <AllEmployeeProfile list={list} />,
    },
  ];

  return (
    <>
      <MemberDetailContext.Provider value={{ memberDetail, setMemberDetail }}>
        <TabbedContent tabs={attendanceTabList} />
        <DetailModal title={'상세정보'} empId={memberDetail.empId ?? 0} content={<MemberModalContent userId={memberDetail.userId ?? ''} />} />
      </MemberDetailContext.Provider>
    </>
  );
};

export default EmployeeTab;
