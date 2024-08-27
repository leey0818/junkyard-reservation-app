'use client';

import { ReactNode, useCallback, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/navigation';

type ModalProps = {
  children: ReactNode;
  minHeight?: number;   // 최소높이
  maxHeight?: number;   // 최대높이
  showClose?: boolean;  // 닫기버튼 표시
};

export default function Modal(props: ModalProps) {
  const router = useRouter();
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [open, setOpen] = useState(true);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, []);

  const onTransitionExited = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <CSSTransition
      classNames="fade"
      in={open}
      timeout={300}
      nodeRef={outerRef}
      appear={true}
      onExited={onTransitionExited}
    >
      <div
        ref={outerRef}
        className="fixed inset-0 bg-black/60 p-6 flex items-center"
        onClick={onDismiss}
      >
        <CSSTransition
          classNames="fade-slide"
          in={open}
          timeout={300}
          nodeRef={innerRef}
          appear={true}
        >
          <div
            ref={innerRef}
            className="flex flex-col p-6 w-full max-w-screen-sm mx-auto bg-white rounded-lg shadow"
            style={{
              minHeight: props.minHeight,
              maxHeight: props.maxHeight,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grow">
              {props.children}
            </div>

            {props.showClose !== false && <button
              className="block flex-none text-center border rounded mt-6 p-2 border-gray-200 bg-gray-50"
              onClick={onDismiss}
            >닫기</button>}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
