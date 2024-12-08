'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import PasswordInput from '@components/form/PasswordInput';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmitHandler, useForm } from 'react-hook-form';
import { doLoginAdmin } from '@/actions/admin/login';

type FormValues = {
  loginId: string;
  password: string;
}

export default function Page() {
  const [state, formAction, pending] = useActionState(doLoginAdmin, null);
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    console.log(state);
    if (state?.success === false) {
      alert(state.message);
    }
  }, [state]);

  const onSubmit: SubmitHandler<FormValues> = (data) => startTransition(() => formAction(data));

  return (
    <main className="px-4 py-12 sm:px-10 sm:py-16">
      <h1 className="text-2xl font-semibold">관리자 로그인</h1>
      <p>폐차장 예약관리 서비스의 관리자 페이지에 로그인 합니다.</p>

      <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-8">
          <p className="text-sm">아이디</p>
          <input
            type="text"
            placeholder="아이디 입력"
            className="border-b border-gray-300 w-full py-1 outline-none"
            {...register('loginId', { required: true, disabled: pending })}
          />
        </label>
        <label className="block mb-8">
          <p className="text-sm">비밀번호</p>
          <PasswordInput
            placeholder="비밀번호 입력"
            className="border-b border-gray-300 w-full py-1 outline-none"
            {...register('password', { required: true, disabled: pending })}
          />
        </label>

        <button
          type="submit"
          className="block mt-12 w-full bg-blue-500 shadow rounded py-2 text-white text-center disabled:bg-blue-500/70"
          disabled={pending}
        >
          {pending && <FontAwesomeIcon icon={faSpinner} spin={true} className="mr-2" />}
          로그인
        </button>
      </form>
    </main>
  );
}
