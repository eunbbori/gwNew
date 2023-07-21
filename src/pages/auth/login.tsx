import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from '@/types/generated/types';
import { useRouter } from 'next/navigation';
import { jwtTokensVar, startEndAtVar } from '@/stores/gqlReactVars';
import Swal from 'sweetalert';
import Spinner from '@/components/Spinner';

export interface ILoginFormValues {
  empEmail: string;
  empPassword: string;
}

const Login = () => {
  const loginSchema = yup.object().shape({
    empEmail: yup
      .string()
      //.matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, '이메일 형식에 맞지 않습니다.')
      .required('이메일을 입력해주세요.'),
    empPassword: yup
      .string()
      //.matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/, '6~10자의 영문, 숫자를 조합해서 입력하세요.')
      .min(6, '6글자 이상 10글자 이하로 입력해주세요.')
      .required('비밀번호를 입력해주세요.'),
  });

  const { push, refresh } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const [isLoading, setLoading] = useState(true);
  console.log('isLoading', isLoading);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  const [loginMutation, { loading }] = useLoginMutation();

  if (loading) return <Spinner />;

  const onLogin = (loginData: ILoginFormValues) => {
    loginMutation({
      variables: {
        email: loginData.empEmail,
        passwd: loginData.empPassword,
      },
      onCompleted: (data) => {
        const auth = data?.login;

        jwtTokensVar({ accessToken: auth?.accessToken || '' });
        startEndAtVar({ startAt: auth?.startAt, endAt: auth?.endAt });

        push('/');
      },
      onError: (err) => {
        Swal('아이디와 비밀번호를 확인해주세요', '', 'error').then((result) => {
          refresh();
        });
      },
    });
  };

  return (
    <div className="w-full mr-auto ml-auto px-6">
      <div className="w-full max-w-full px-3 mx-auto md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12 mt-[0px] mb-[200px] pt-[150px]">
        <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
            <div className="p-6 pb-0 mb-0 bg-transparent border-b-0 rounded-t-2xl">
              <h3 className="relative z-10 font-bold text-transparent bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text">로그인</h3>
              <p className="mb-0">이메일과 비밀번호를 입력해주세요.</p>
            </div>
          </div>
          <div className="flex-auto p-6">
            <form onSubmit={handleSubmit(onLogin)}>
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700">User E-mail</label>
              <div className="mb-4">
                <input
                  {...register('empEmail')}
                  placeholder="사용자 E-mail"
                  type="text"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  aria-label="EmpEmail"
                  aria-describedby="EmpEmail-addon"
                />
                <div className="text-xs text-red-600">{errors.empEmail?.message}</div>
              </div>
              <label className="mb-2 ml-1 font-bold text-xs text-slate-700">Password</label>
              <div className="mb-4">
                <input
                  {...register('empPassword')}
                  placeholder="비밀번호"
                  type="password"
                  className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                  aria-label="Password"
                  aria-describedby="Password-login"
                />
                <div className="text-xs text-red-600">{errors.empPassword?.message}</div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-cente text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
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

export const getStaticProps = () => {
  return {
    props: { noLayout: true },
  };
};

export default Login;
