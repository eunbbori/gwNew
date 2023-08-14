import editIcon from 'src/assets/svg/edit.svg';
import alarmIcon from 'src/assets/svg/alarm.svg';
import laptopIcon from 'src/assets/svg/laptop.svg';
import flightIcon from 'src/assets/svg/flight.svg';
import userGroupIcon from 'src/assets/svg/user-group.svg';

export type RouteInfo = {
  id: string;
  title: string;
  img?: any;
  linkable: boolean;
};

export type MenuInfo = {
  firstMenu: string;
  secondMenu?: string[];
};

export const allRouteInfos: RouteInfo[] = [
  { id: '/', title: '홈', linkable: true },
  { id: 'approval', title: '결재', img: editIcon, linkable: false },
  { id: 'test1', title: 'test1', linkable: false },
  { id: 'test2', title: 'test2', linkable: false },
  { id: 'attendance', title: '근태', img: alarmIcon, linkable: false },
  { id: 'dailyAttendance', title: '일별조회', linkable: true },
  { id: 'conditionalAttendance', title: '조건조회', linkable: true },
  { id: 'test4', title: 'test4', linkable: false },
  { id: 'dashboard', title: '대시보드', img: laptopIcon, linkable: false },
  { id: 'test5', title: 'test5', linkable: false },
  { id: 'test6', title: 'test6', linkable: false },
  { id: 'dayoff', title: '휴가', img: flightIcon, linkable: false },
  { id: 'test7', title: 'test7', linkable: false },
  { id: 'test8', title: 'test8', linkable: false },
  { id: 'employee', title: '직원', img: userGroupIcon, linkable: false },
  { id: 'listEmp', title: '직원목록', linkable: true },
  { id: 'editEmp', title: '직원수정', linkable: false },
  { id: 'changePwd', title: '비밀번호변경', linkable: false },
  { id: 'addEmp', title: '직원등록', linkable: true },
];

export const getRouteInfo = (id: string): RouteInfo | undefined => {
  return allRouteInfos.find((e) => e.id === id);
};

export const allMenuInfos: MenuInfo[] = [
  { firstMenu: 'approval' },
  { firstMenu: 'attendance', secondMenu: ['dailyAttendance', 'conditionalAttendance'] },
  { firstMenu: 'dashboard' },
  { firstMenu: 'dayoff' },
  { firstMenu: 'employee', secondMenu: ['listEmp', 'addEmp'] },
];

export const allUris = new Map<string, string>();

allMenuInfos.forEach((e) => {
  const first = e.firstMenu;
  e.secondMenu &&
    e.secondMenu.forEach((s) => {
      allUris.set(s, '/' + first + '/' + s);
    });
});

export const defaultRouteInfo: MenuInfo = allMenuInfos[1];
