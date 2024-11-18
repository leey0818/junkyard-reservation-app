'use client';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { doSignup } from '@/actions/user/signup';

type SignupFormProps = {
  initialName?: string;
  secToken: string;
};

type FormValues = {
  nickname: string;
  phoneNo: string;
  email: string;
};

export default function SignupForm(props: SignupFormProps) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<FormValues>({
    defaultValues: { nickname: props.initialName },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    startTransition(async () => {
      const { success, message } = await doSignup(props.secToken, data);
      if (!success) {
        alert(message);
      }
    });
  };

  return (
    <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
      <label className="block mb-8">
        <p className="text-sm">닉네임</p>
        <input
          type="text"
          placeholder="닉네임 입력 (최대 20자)"
          autoFocus={true}
          className={classNames(
            "border-b w-full py-1 outline-none",
            errors.nickname ? 'border-red-600' : 'border-gray-300',
          )}
          {...register('nickname', {
            required: '닉네임을 입력하세요.',
            maxLength: {value: 20, message: '닉네임은 최대 20자리 입력 가능합니다.'},
            disabled: isPending,
          })}
        />
        {errors.nickname && (<p className="text-red-600 text-sm">{errors.nickname.message}</p>)}
      </label>
      <label className="block mb-8">
        <p className="text-sm">휴대폰 번호</p>
        <input
          type="text"
          placeholder="휴대폰 번호 입력"
          maxLength={13}
          className={classNames(
            "border-b w-full py-1 outline-none",
            errors.phoneNo ? 'border-red-600' : 'border-gray-300',
          )}
          {...register('phoneNo', {
            required: '휴대폰 번호를 입력하세요.',
            pattern: {value: /^(01\d)-?(\d{3,4})-?(\d{4})$/, message: '올바른 휴대폰 번호를 입력하세요.'},
            disabled: isPending,
            onChange: (evt) => {
              const value = evt.target.value.replace(/[^0-9]/g, '');
              setValue('phoneNo', value.replace(/^(01\d)-?(\d{3,4})-?(\d{4})$/, '$1-$2-$3'), {shouldValidate: true});
            },
          })}
        />
        {errors.phoneNo && (<p className="text-red-600 text-sm">{errors.phoneNo.message}</p>)}
      </label>
      <label className="block mb-8">
        <p className="text-sm">이메일</p>
        <input
          type="email"
          placeholder="이메일 입력"
          className={classNames(
            "border-b w-full py-1 outline-none",
            errors.email ? 'border-red-600' : 'border-gray-300',
          )}
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: '올바른 이메일을 입력하세요.'},
            disabled: isPending,
          })}
        />
        {errors.email && (<p className="text-red-600 text-sm">{errors.email.message}</p>)}
      </label>

      <button
        type="submit"
        className="block mt-12 w-full bg-blue-500 shadow rounded py-2 text-white text-center disabled:bg-blue-500/70"
        disabled={isPending}
      >
        {isPending && <FontAwesomeIcon icon={faSpinner} spin={true} className="mr-2"/>}
        가입하기
      </button>
    </form>
  );
}
