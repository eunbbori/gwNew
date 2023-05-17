import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  const login = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const response = await signIn('email-password-credential', {
      email,
      password,
      redirect: false,
    });
    console.log(response);
  };
  return (
    <form onSubmit={login}>
      <label>
        이메일 :
        <input type="email" name="email" placeholder="test@test.com" />
      </label>
      <label>
        비밀번호 :
        <input type="password" name="password" />
      </label>
      <button type="submit">로그인</button>
    </form>
  );
};
export default Login;
