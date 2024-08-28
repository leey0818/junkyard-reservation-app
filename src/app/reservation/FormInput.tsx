import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: boolean;
  required?: boolean;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(props, ref) {
  const inputProps = {
    ...props,
    label: undefined,
    error: undefined,
    required: undefined,
  };

  return (
    <label className="block mb-4 sm:mb-6">
      <p className="mb-1">
        {props.label}
        {props.required && <span className="text-red-600 ml-1">*</span>}
      </p>
      <input
        {...inputProps}
        ref={ref}
        type="text"
        className={classNames(
          'border border-gray-300 rounded w-full p-1 outline-none',
          props.error && 'border-red-400 placeholder-red-500',
          inputProps.className,
        )}
      />
    </label>
  )
});

export default FormInput;
