import editIcon from 'src/assets/svg/edit.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import laptopIcon from 'src/assets/svg/laptop.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';
export interface ISubMenuProps {
  menuTitle: string;
  linkTitle: string;
}

export type RouteInfo = {
  id: string;
  name: string;
  img: any;
  content: JSX.Element;
  submenu?: ISubMenuProps[];
};

export const routeInfos: RouteInfo[] = [
  {
    id: 'approval',
    name: '결제',
    img: editIcon,
    content: <>결재</>,
    submenu: [
      {
        menuTitle: 'test1',
        linkTitle: '',
      },
      {
        menuTitle: 'test2',
        linkTitle: '',
      },
    ],
  },
  {
    id: 'attendance',
    name: '근태관리',
    img: alarmIcon,
    content: <>근태관리</>,
    submenu: [
      {
        menuTitle: '출퇴근',
        linkTitle: '/listAttendance',
      },
      {
        menuTitle: 'test4',
        linkTitle: '',
      },
    ],
  },
  {
    id: 'dashboard',
    name: '대시보드',
    img: laptopIcon,
    content: <>대시보드</>,
    submenu: [
      {
        menuTitle: 'test5',
        linkTitle: '',
      },
      {
        menuTitle: 'test6',
        linkTitle: '',
      },
    ],
  },
  {
    id: 'dayoff',
    name: '휴가관리',
    img: flightIcon,
    content: <>휴가관리</>,
    submenu: [
      {
        menuTitle: 'test7',
        linkTitle: '',
      },
      {
        menuTitle: 'test8',
        linkTitle: '',
      },
    ],
  },
  {
    id: 'employee',
    name: '직원관리',
    img: userGroupIcon,
    content: (
      <>
        <span>직원관리</span>
      </>
    ),
    submenu: [
      {
        menuTitle: '구성원',
        linkTitle: '/listEmp',
      },
      {
        menuTitle: '직원등록',
        linkTitle: '/addEmp',
      },
    ],
  },
];

export const defaultRouteInfo: RouteInfo = routeInfos[1];
