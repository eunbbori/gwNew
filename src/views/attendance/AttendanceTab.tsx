import Attendance from './Attendance';
import TabbedContent, { ITabbedContent } from '../common/TabbedContent';
import ConditionalAttendance from './ConditionalAttendance';

const attendanceTabList: ITabbedContent[] = [
  {
    title: '일별조회',
    id: 'tabs-attendance-daily',
    content: <Attendance />,
  },
  {
    title: '조건조회',
    id: 'tabs-attendance-condition',
    content: <ConditionalAttendance />,
  },
];

const AttendanceTab = () => {
  return <TabbedContent tabs={attendanceTabList} />;
};

export default AttendanceTab;
