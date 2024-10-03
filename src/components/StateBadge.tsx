import classNames from 'classnames';

type StateBadgeProps = {
  className?: string;
  state: 'wait' | 'proc' | 'fail' | 'done';
  text?: string;
}

export default function StateBadge(props: StateBadgeProps) {
  const isStateWait = props.state === 'wait';
  const isStateProc = props.state === 'proc';
  const isStateFail = props.state === 'fail';
  const isStateDone = props.state === 'done';

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
    >{props.text ?? (isStateWait ? '대기' : isStateProc ? '진행중' : isStateFail ? '실패' : isStateDone ? '완료' : '')}</span>
  )
}
