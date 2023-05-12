import { makeVar } from '@apollo/client';

export interface AttendanceInfo {
  employeeId: number;
  userId: string;
  employeeName: string;
  startAt: Date;
  endAt: Date;
}

const attendanceInfoIdVar = makeVar(0);
const attendanceInfoVar = makeVar<AttendanceInfo[]>([]);

export const getAttendanceByDate = (date: Date) => {
  // const attendanceInfo = attendanceInfoVar.filter((info: AttendanceInfo) => info.startAt === date);
};
