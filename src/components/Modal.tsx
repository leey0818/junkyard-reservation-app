'use client';

import { ReactNode, useCallback, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

type ModalProps = {
  open: boolean;
  children: ReactNode;
  minHeight?: number;   // 최소높이
  maxHeight?: number;   // 최대높이
  onClickOutside?: () => void;
  onClosed?: () => void;
};

export default function Modal(props: ModalProps) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  const onTransitionExited = useCallback(() => {
    props.onClosed?.();
  }, [props]);

  return (
    <CSSTransition
      classNames="fade"
      in={props.open}
      timeout={300}
      nodeRef={outerRef}
      appear={true}
      onExited={onTransitionExited}
    >
      <div
        ref={outerRef}
        className="fixed inset-0 bg-black/60 p-6 flex items-center"
        onClick={props.onClickOutside}
      >
        <CSSTransition
          classNames="fade-slide"
          in={props.open}
          timeout={300}
          nodeRef={innerRef}
          appear={true}
        >
          <div
            ref={innerRef}
            className="p-6 w-full max-w-screen-sm mx-auto bg-white rounded-lg shadow"
            style={{
              minHeight: props.minHeight,
              maxHeight: props.maxHeight,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
