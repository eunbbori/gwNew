import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export interface loginFormValues {
  EmpEmail: string;
  EmpPassword: string;
}
const Login: React.FC = () => {
  const loginSchema = yup.object().shape({
    EmpEmail: yup
      .string()
      .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
      .required('이메일을 입력해주세요.'),
    EmpPassword: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/, '6~10자의 영문, 숫자를 조합해서 입력하세요.')
      .min(6, '6글자 이상 10글자 이하로 입력해주세요.')
      .required('비밀번호를 입력해주세요.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onLogin = async (data: loginFormValues) => {
    console.log(data);
  };
  return (
    <div className="w-full mr-auto ml-auto px-6">
      <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <h5>Login</h5>
          </div>
          <div className="flex-auto p-6">
            <form onSubmit={handleSubmit(onLogin)}>
              <div className="mb-4">
                <input
                  {...register('EmpEmail')}
                  placeholder="이메일"
                  type="text"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  aria-label="EmpEmail"
                  aria-describedby="EmpEmail-addon"
                />
                <div>{errors.EmpEmail?.message}</div>
              </div>
              <div className="mb-4">
                <input
                  {...register('EmpPassword')}
                  placeholder="비밀번호"
                  type="test"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  aria-label="Password"
                  aria-describedby="Password-login"
                />
                <div>{errors.EmpPassword?.message}</div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
