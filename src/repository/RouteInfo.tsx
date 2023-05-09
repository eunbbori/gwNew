import editIcon from 'src/assets/svg/edit.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import laptopIcon from 'src/assets/svg/laptop.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';

import DateMemberCnt from '@/views/attendance/DateMemberCnt';
import TableHeader from '@/views/attendance/TableHeader';
import TableRows from '@/views/attendance/TableRows';

export type RouteInfo = {
  id: string;
  name: string;
  img: any;
  upper: JSX.Element;
  lower: JSX.Element;
};

export const routeInfos: RouteInfo[] = [
  {
    id: 'approval',
    name: '결제',
    img: editIcon,
    upper: <>결재</>,
    lower: <></>,
  },
  {
    id: 'attendance',
    name: '근태관리',
    img: alarmIcon,
    upper: <DateMemberCnt dt={new Date()} cnt={15} />,
    lower: (
      <>
        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
          <TableHeader />
          <tbody>
            <TableRows />
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 'dashboard',
    name: '대시보드',
    img: laptopIcon,
    upper: <>대시보드</>,
    lower: <></>,
  },
  {
    id: 'dayoff',
    name: '휴가관리',
    img: flightIcon,
    upper: <>휴가관리</>,
    lower: <></>,
  },
  {
    id: 'member',
    name: '직원관리',
    img: userGroupIcon,
    upper: <>직원관리</>,
    lower: <></>,
  },
];

export const defaultRouteInfo: RouteInfo = routeInfos[1];
