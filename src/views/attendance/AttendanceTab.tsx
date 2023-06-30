import Attendance from './Attendance';
import TabbedContent, { ITabbedContent } from '../common/TabbedContent';
import { useEffect } from 'react';
import { breadCrumbPathVar } from '@/stores/gqlReactVars';
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
  useEffect(() => {
    breadCrumbPathVar(['/', 'attendance', 'listAttendance']);
  }, []);

  return <TabbedContent tabs={attendanceTabList} />;
};

export default AttendanceTab;
