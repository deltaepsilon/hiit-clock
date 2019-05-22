import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { IconButton } from '@rmwc/icon-button';
import ArrowBack from '../svg/arrow-back';

export default React.memo(({ href }) => {
  const el = window.document.querySelector('#logo');

  return ReactDOM.createPortal(<Logo href={href} />, el);
});

function Logo({ href }) {
  return (
    <Link href={href}>
      <>
        <a className="text" href={href}>
          HiiT Clock
        </a>
        <IconButton icon={<ArrowBack />} tag="a" href={href} />
      </>
    </Link>
  );
}
