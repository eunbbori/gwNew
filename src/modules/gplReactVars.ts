import { makeVar } from '@apollo/client';

// JWT Tokens
export const jwtTokensVar = makeVar({
  accessToken: '',
  //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJnaWxkb25nIiwidXNlck5hbWUiOiLtmY3quLjrj5kiLCJkZXBhcnRtZW50TmFtZSI6IuqwnOuwnO2MgCIsImlhdCI6MTY4NDcxNDg4NCwiZXhwIjoxNjg0ODAxMjg0fQ.D-FKg9XCrzqin_J9-yoLuwJtPWK14y-7m01ctkwd32vGuiaP0GUjNa7mIgbtdS73ee5gnYM9lEwXjszcvZxVs-z3uOGCAgdt18P6912z9dTeaFSOOXYhWRVj_9uZoMddeT3qL5IQDKGjoy8iKSRQrz8rjxVCxDoqYDkYncIc02b6Jzj1kSQIsFzEYIvprDX65p3to_FyV8RGfFmD3NImnEqPSEk7ywezFXc5xIQ8amnhKVzvoSop8c9gHp6ap7s02BFQKpxAO7c4r4N63aMon10ls6SSu159sI9DR8WI7RIilF4uhJ7ekUVN4yD-Jc4hsmAcI4xm3HYGDwI9ApRlEA',
  refreshToken: '',
  //   'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJnaWxkb25nIiwidXNlck5hbWUiOiLtmY3quLjrj5kiLCJkZXBhcnRtZW50TmFtZSI6IuqwnOuwnO2MgCIsImlhdCI6MTY4NDcxNDg4NCwiZXhwIjoxNjg0ODAxMjg0fQ.Xb0MSRhS2Q8OpYhRWmICR2t0ikc20u_G7nIjIODQXMwZaEcxeyGjv7au3ZVdJ0ON41olkF2u93o0hKCoKzi4LUo0Oubuy-h-uL1WXpx7AfgdCo_g68LND-Kil1ww-O2eMEBMH006eNqOgMX940BkwVhkDAUXj0kqm3QJJhbU-LX9IxB2uEFCwbN5OcY8CV7UexHv9sLjS4DBWekmsJl3YUGk77lj3Xmr6IXfryKniKwIuKOngJM0lGAs5xkrbju53eBmL2F91JrffC4OMTBtEBvcWCracdOsURN4GIqnTl6qUemkHKhh00H6dM5Io8D6tlnF54Od0WTqRPxx1-90IQ',
});

// JWT Token Payload
export type AuthData = {
  userId: string;
  userName: string;
  departmentName: string;
};

// Attendance Date
export const attendanceDateVar = makeVar(new Date());
// OffTime Date
export const offTimeVar = makeVar(new Date());
