'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import FormInput from './FormInput';

type ReservationFormProps = {
  secToken: string;
  onSubmit?: () => void;
  onCancel?: () => void;
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
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormValues>();

  const onFormSubmit: SubmitHandler<FormValues> = useCallback((formData) => {
    console.log(formData);
  }, []);

  useEffect(() => {
    setValue('token', props.secToken);
  }, [setValue, props.secToken]);

  return (
    <>
      <h1 className="font-semibold text-lg mb-8">예약하기</h1>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <FormInput
          {...register('name', {required: true})}
          required={true}
          error={!!errors.name}
          label="성명"
          placeholder="성명을 입력하세요."
        />
        <FormInput
          {...register('phoneNo', {required: true})}
          required={true}
          error={!!errors.phoneNo}
          label="전화번호"
          placeholder="연락 가능한 전화번호를 입력하세요."
        />
        <FormInput
          {...register('vendor', {required: true})}
          required={true}
          error={!!errors.vendor}
          label="제조사"
          placeholder="차량 제조사를 입력하세요. ex) 현대, 기아, 벤츠"
        />
        <FormInput
          {...register('model', {required: true})}
          required={true}
          error={!!errors.model}
          label="모델명"
          placeholder="차량 모델명을 입력하세요. ex) 소나타, 그랜저"
        />
        <FormInput
          {...register('carNo', {required: true})}
          required={true}
          error={!!errors.carNo}
          label="차량번호"
          placeholder="차량 번호를 입력하세요."
        />
        <FormInput
          {...register('note')}
          label="예약내용"
          placeholder="추가로 전달할 내용을 입력하세요."
        />

        <button
          type="submit"
          className="w-full border border-blue-600 bg-blue-500 text-white rounded px-3 py-1 mt-4"
        >예약하기
        </button>
        <button
          type="button"
          className="w-full border border-gray-200 bg-gray-50 rounded mt-2 px-3 py-1"
          onClick={props.onCancel}
        >닫기
        </button>
      </form>
    </>
  )
}
