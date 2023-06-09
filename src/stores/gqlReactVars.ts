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
    startEndAtVar({
      startAt: data.refresh?.startAt,
      endAt: data.refresh?.endAt,
    });
  }
};
