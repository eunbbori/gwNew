import jwt_decode from 'jwt-decode';
import { useReactiveVar } from '@apollo/client';
import { AuthData, jwtTokensVar } from '@/stores/gqlReactVars';

type IUserInfo = {
  employeeId: string;
  userName: string;
  photoUrl: string;
  userId: string;
  adminYn?: string;
};

type IUserToken = () => IUserInfo | null;

export const useUserToken: IUserToken = () => {
  const tokens = useReactiveVar(jwtTokensVar);

  if (tokens?.accessToken) {
    const decoded = jwt_decode<AuthData>(tokens.accessToken);
    return {
      employeeId: decoded.employeeId,
      userName: decoded.userName,
      photoUrl: decoded.photoUrl || '',
      userId: decoded.userId,
      adminYn: decoded.adminYn ?? 'NO',
    };
  }
  return null;
};
