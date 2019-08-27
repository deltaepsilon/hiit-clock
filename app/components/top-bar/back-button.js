import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';

export default React.memo(({ href }) => {
  if (typeof window != 'undefined') {
    const el = window.document.querySelector('#back-button');

    return ReactDOM.createPortal(<BackButton href={href} />, el);
  } else {
    return null;
  }
});

function BackButton({ href }) {
  return (
    <Link href={href}>
      <a>
        <IconButton icon={<ArrowBack />} href={href} />
      </a>
    </Link>
  );
}
