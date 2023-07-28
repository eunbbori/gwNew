import jwt_decode from 'jwt-decode';
import { useReactiveVar } from '@apollo/client';
import { AuthData, jwtTokensVar } from '@/stores/gqlReactVars';

type IUserInfo = {
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
    console.log('decoded', decoded);
    return {
      userName: decoded.userName,
      photoUrl: decoded.photoUrl || '',
      userId: decoded.userId,
      adminYn: decoded.adminYn ?? 'NO',
    };
  }
  return null;
};
