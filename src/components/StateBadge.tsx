import classNames from 'classnames';

type StateBadgeProps = {
  className?: string;
  state: 'wait' | 'proc' | 'done';
}

export default function StateBadge(props: StateBadgeProps) {
  const isStateWait = props.state === 'wait';
  const isStateProc = props.state === 'proc';
  const isStateDone = props.state === 'done';

  return (
    <span
      className={classNames(
        'inline-block text-xs rounded-full py-0.5 px-1.5 font-bold text-white',
        props.className,
        isStateWait && 'bg-gray-400',
        isStateProc && 'bg-orange-400',
        isStateDone && 'bg-sky-400',
      )}
    >{isStateWait ? '대기' : isStateProc ? '진행중' : isStateDone ? '완료' : ''}</span>
  )
}
