'use client';

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { forwardRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

type NoCacheLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

const NoCacheLink = forwardRef<HTMLAnchorElement, NoCacheLinkProps>(function NoCacheLink(props, ref) {
  const router = useRouter();
  const handleClickLink = useCallback((evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    router.push(props.href + '?_=' + Date.now().toString(36), { scroll: false });
  }, [router, props.href]);

  return <a {...props} ref={ref} onClick={handleClickLink}>{props.children}</a>;
});

export default NoCacheLink;
