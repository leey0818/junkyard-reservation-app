import Modal from '@components/Modal';
import { forwardRef, InputHTMLAttributes } from 'react';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(props, ref) {
  const inputProps = {
    ...props,
    label: undefined,
  };

  return (
    <label className="block mb-8">
      <p className="mb-1">{props.label}</p>
      <input
        type="text"
        className="border border-gray-300 rounded w-full p-1 outline-none"
        ref={ref}
        {...inputProps}
      />
    </label>
  )
});

export default function Page() {
  return (
    <Modal>
      <h1 className="font-semibold text-lg mb-8">예약하기</h1>
      <form>
        <FormInput label="성명" placeholder="성명을 입력하세요." />
        <FormInput label="전화번호" placeholder="연락 가능한 전화번호를 입력하세요." />
      </form>
    </Modal>
  )
}
