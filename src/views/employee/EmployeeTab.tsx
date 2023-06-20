import { IGetAllEmployeeQuery } from '@/types/generated/types';
import AllEmployeeProfile from './AllEmployeeProfile';
import TeamEmployeeProfile from './TeamEmployeeProfile';
import TabbedContent, { ITabbedContent } from '../common/TabbedContent';

const EmployeeTab = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  const attendanceTabList: ITabbedContent[] = [
    {
      title: '전체',
      id: 'tabs-employees-total',
      content: <AllEmployeeProfile list={list} />,
    },
    {
      title: '팀별',
      id: 'abs-employees-team',
      content: <TeamEmployeeProfile list={list} />,
    },
  ];

  return <TabbedContent tabs={attendanceTabList} />;
};

export default EmployeeTab;
