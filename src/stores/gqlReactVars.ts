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

// Today startAt time of currently login user
export const startEndAtVar = makeVar({
  startAt: '',
  endAt: '',
});

// Attendance Date
export const attendanceDateVar = makeVar(new Date());

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

//Attendance Filter
export const attendanceFilterVar = makeVar({
  name: '',
  dept: -1,
});

// export const attendanceFilterNameVar = makeVar({
//   name: '',
// });

// export const attendanceFilterDeptVar = makeVar({
//   dept: '',
// });
