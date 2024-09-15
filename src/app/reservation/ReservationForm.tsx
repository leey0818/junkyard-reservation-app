'use client';

import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import FormInput from './FormInput';

type ReservationFormProps = {
  secToken: string;
};

type FormValues = {
  token: string;
  name: string;
  phoneNo: string;
  vendor: string;
  model: string;
  carNo: string;
  note: string;
};

export default function ReservationForm(props: ReservationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormValues>();

  const onFormSubmit: SubmitHandler<FormValues> = useCallback(async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/reservation/register', { method: 'POST', body: JSON.stringify(formData) });
      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          alert('정상 예약되었습니다.');
          router.replace('/');
        } else {
          alert(`예약 실패: ${result.message}`);
        }
      } else {
        alert(`서버와 통신 중 오류가 발생하였습니다. [${res.status}]`);
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    setValue('token', props.secToken);
  }, [setValue, props.secToken]);

  return (
    <>
      <h1 className="font-semibold text-2xl leading-normal">예약하기</h1>
      <p className="mb-6">예약하실 차량 정보를 입력해 주세요.</p>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormInput
          {...register('name', { required: true, disabled: loading })}
          required={true}
          error={!!errors.name}
          label="성명"
          placeholder="성명을 입력하세요."
          maxLength={20}
        />
        <FormInput
          {...register('phoneNo', {
            required: true,
            disabled: loading,
            pattern: /^(01\d)-?(\d{3,4})-?(\d{4})$/,
            onChange: (evt) => {
              const value = evt.target.value.replace(/[^0-9]/g, '');
              setValue('phoneNo', value.replace(/^(01\d)-?(\d{3,4})-?(\d{4})$/, '$1-$2-$3'), { shouldValidate: true });
            },
          })}
          required={true}
          error={!!errors.phoneNo}
          label="전화번호"
          placeholder="연락 가능한 전화번호를 입력하세요."
          maxLength={14}
        />
        <FormInput
          {...register('vendor', { required: true, disabled: loading })}
          required={true}
          error={!!errors.vendor}
          disabled={loading}
          label="제조사"
          placeholder="차량 제조사를 입력하세요. ex) 현대, 기아, 벤츠"
          maxLength={10}
        />
        <FormInput
          {...register('model', { required: true, disabled: loading })}
          required={true}
          error={!!errors.model}
          disabled={loading}
          label="모델명"
          placeholder="차량 모델명을 입력하세요. ex) 소나타, 그랜저"
          maxLength={20}
        />
        <FormInput
          {...register('carNo', { required: true, disabled: loading })}
          required={true}
          error={!!errors.carNo}
          disabled={loading}
          label="차량번호"
          placeholder="차량 번호를 입력하세요."
          maxLength={9}
        />
        <FormInput
          {...register('note')}
          disabled={loading}
          label="예약내용"
          placeholder="추가로 전달할 내용을 입력하세요."
        />

        <button
          type="submit"
          className="w-full border border-blue-600 bg-blue-500 text-white rounded px-3 py-1 mt-4"
          disabled={loading}
        >예약하기
        </button>
      </form>
    </>
  )
}
