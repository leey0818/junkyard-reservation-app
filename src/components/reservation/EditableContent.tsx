'use client';

import { useEffect, useState, useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { updateReservationContent } from '@/actions/reservation/update';

type EditableContentProps = {
  id: string;
  content: string;
};

export default function EditableContent(props: EditableContentProps) {
  const [isEdit, setEdit] = useState(false);
  const [content, setContent] = useState(props.content);
  const [isPending, startTransition] = useTransition();

  const onClickEdit = () => {
    startTransition(async () => {
      const { success, message } = await updateReservationContent(props.id, content);
      if (!success) {
        alert(message);
      } else {
        setEdit(false);
      }
    });
  };

  useEffect(() => {
    if (isEdit) setContent(props.content);
  }, [isEdit, props.content]);

  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold">
        <span>예약 내용</span>
        {!isEdit && <FontAwesomeIcon
          icon={faPen}
          className="text-sm ml-2 cursor-pointer"
          onClick={() => setEdit(true)}
        />}
      </h1>
      {isEdit
        ? <div>
          <textarea
            className="border resize-none w-full rounded h-16 p-1"
            value={content}
            disabled={isPending}
            autoFocus={true}
            onInput={(e) => setContent(e.currentTarget.value)}
          ></textarea>
          <div className="grid grid-cols-2 gap-x-2" hidden={isPending}>
            <button className="block border rounded w-full bg-white py-0.5" onClick={onClickEdit}>
              수정
            </button>
            <button className="block border rounded w-full bg-white py-0.5" onClick={() => setEdit(false)}>
              취소
            </button>
          </div>
        </div>
        : <p className="whitespace-pre-wrap break-all">{props.content}</p>}
    </div>
  );
}
