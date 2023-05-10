import editIcon from 'src/assets/svg/edit.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import laptopIcon from 'src/assets/svg/laptop.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';

import Attendance from '@/views/attendance/Attendance';
import DateMemberCnt from '@/views/attendance/DateMemberCnt';

export type RouteInfo = {
  id: string;
  name: string;
  img: any;
  content: JSX.Element;
};

export const routeInfos: RouteInfo[] = [
  {
    id: 'approval',
    name: '결제',
    img: editIcon,
    content: <>결재</>,
  },
  {
    id: 'attendance',
    name: '근태관리',
    img: alarmIcon,
    content: <Attendance />,
  },
  {
    id: 'dashboard',
    name: '대시보드',
    img: laptopIcon,
    content: <>대시보드</>,
  },
  {
    id: 'dayoff',
    name: '휴가관리',
    img: flightIcon,
    content: <>휴가관리</>,
  },
  {
    id: 'member',
    name: '직원관리',
    img: userGroupIcon,
    content: <>직원관리</>,
  },
];

export const defaultRouteInfo: RouteInfo = routeInfos[1];
