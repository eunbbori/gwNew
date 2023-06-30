import { IRefreshMutation } from '@/types/generated/types';
import { makeVar } from '@apollo/client';

// JWT Tokens
export const jwtTokensVar = makeVar({
  accessToken: '',
});

// JWT Token Payload
export type AuthData = {
  userId: string;
  userName: string;
  departmentName: string;
  photoUrl?: string;
};

// Today ComeToWork / LeaveWork time of currently login user
export const startEndAtVar = makeVar({
  startAt: '',
  endAt: '',
});

export const setLocalFromToken = (data: IRefreshMutation) => {
  if (data?.refresh) {
    jwtTokensVar({ accessToken: data.refresh?.accessToken || '' });
    console.log('Access Token is refreshed!');
    startEndAtVar({
      startAt: data.refresh?.startAt,
      endAt: data.refresh?.endAt,
    });
  }
};

////////////////
// Attendance //
////////////////

// Attendance Search Date for Calendar
export const attendanceDateVar = makeVar(new Date());

//Attendance Filter
export const attendanceFilterVar = makeVar({
  name: '',
  dept: -1,
  isDisplayed: false,
});

export type SortColAttendance = 'name' | 'startAt';

//Attendance Sort
export const attendanceSortVar = makeVar({
  sort: 'startAt',
  isAscending: true,
});

//Attendance Total Count
export const attendanceTotalCntVar = makeVar(0);

//Member Detail userId
export const memberDetailId = makeVar('');

////////////////
// BreadCrumb //
////////////////
export const breadCrumbPathVar = makeVar(['/']);
