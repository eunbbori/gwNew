import { IGetAllEmployeeQuery } from '@/types/generated/types';
import AllEmployeeProfile from './AllEmployeeProfile';
import TeamEmployeeProfile from './TeamEmployeeProfile';
import TabbedContent, { ITabbedContent } from '../common/TabbedContent';
import DetailModal from '@/components/Modal/DetailModal';
import MemberModalContent from '@/components/Employee/Detail/MemberModalContent';
import { useEffect } from 'react';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';

const EmployeeTab = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  useEffect(() => {
    breadCrumbPathVar(['/', 'employee', 'listEmp']);
  }, []);

  const attendanceTabList: ITabbedContent[] = [
    {
      title: '전체',
      id: 'tabs-employees-total',
      content: <AllEmployeeProfile list={list} />,
    },
    {
      title: '팀별',
      id: 'tabs-employees-team',
      content: <TeamEmployeeProfile list={list} />,
    },
  ];

  return (
    <>
      <TabbedContent tabs={attendanceTabList} />
      <DetailModal title={'상세정보'} content={<MemberModalContent />} />
    </>
  );
};

export default EmployeeTab;
