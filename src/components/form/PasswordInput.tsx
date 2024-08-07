'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [shown, setShown] = useState(false);

  return (
    <div className="relative">
      <input
        type={shown ? 'text' : 'password'}
        ref={ref}
        {...props}
      />
      <a
        className="absolute right-1 text-gray-400 leading-0 translate-y-1/2 cursor-pointer"
        onClick={() => !props.disabled && setShown(!shown)}
      >
        <FontAwesomeIcon icon={shown ? faEye : faEyeSlash} fixedWidth={true} />
      </a>
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
