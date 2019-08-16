/* globals navigator */
import React, { useCallback } from 'react';
import useAlert from '../hooks/use-alert';
import copyToClipboard from '../../utilities/copy-to-clipboard';

export default function shareUrl({ children, title, href }) {
  const alert = useAlert();
  const handleClick = useCallback(
    async e => {
      if (navigator.share) {
        e.preventDefault();

        await navigator.share({ url: href });
      } else {
        try {
          copyToClipboard(href, () => alert('Copied to clipboard'));

          e.preventDefault();
        } catch (error) {
          console.error(error);
        }
      }
    },
    [title, href]
  );

  return (
    <a href={href} onClick={handleClick} target="_blank">
      {children}
    </a>
  );
}
