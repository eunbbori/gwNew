import Attendance from './Attendance';
import TabbedContent, { ITabbedContent } from '../common/TabbedContent';

const attendanceTabList: ITabbedContent[] = [
  {
    title: '일별조회',
    id: 'tabs-attendance-daily',
    content: <Attendance />,
  },
  {
    title: '조건조회',
    id: 'tabs-attendance-condition',
    content: <>Tab 2 content</>,
  },
];

const AttendanceTab = () => {
  return <TabbedContent tabs={attendanceTabList} />;
};

export default AttendanceTab;