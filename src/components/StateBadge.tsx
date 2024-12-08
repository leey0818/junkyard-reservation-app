import classNames from 'classnames';

type StateBadgeProps = {
  className?: string;
  status: string;
}

export default function StateBadge(props: StateBadgeProps) {
  const state = (() => {
    switch (props.status) {
      case 'PENDING': return 'wait';
      case 'CONFIRMED': return 'proc';
      case 'REJECTED': return 'fail';
      default: return 'done';
    }
  })();
  const stateText = (() => {
    switch (props.status) {
      case 'PENDING': return '대기';
      case 'CONFIRMED': return '진행중';
      case 'CANCELED': return '취소됨';
      case 'REJECTED': return '거절됨';
      case 'COMPLETED': return '완료';
      default: return '';
    }
  })();

  const isStateWait = state === 'wait';
  const isStateProc = state === 'proc';
  const isStateFail = state === 'fail';
  const isStateDone = state === 'done';

  return (
    <span
      className={classNames(
        'inline-block text-xs rounded-full py-0.5 px-1.5 font-bold text-white',
        props.className,
        isStateWait && 'bg-gray-400',
        isStateProc && 'bg-orange-400',
        isStateFail && 'bg-red-400',
        isStateDone && 'bg-sky-400',
      )}
    >{stateText}</span>
  )
}
