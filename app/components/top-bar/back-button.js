import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';

export default React.memo(({ href }) => {
  const el = window.document.querySelector('#back-button');

  return ReactDOM.createPortal(<BackButton href={href} />, el);
});

function BackButton({ href }) {
  return (
    <Link href={href}>
      <IconButton icon={<ArrowBack />} tag="a" href={href} />
    </Link>
  );
}
