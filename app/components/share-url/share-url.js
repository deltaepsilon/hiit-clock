/* globals navigator */
import React, { useCallback } from 'react';
import useAlert from '../hooks/use-alert';
import copyToClipboard from '../../utilities/copy-to-clipboard';

export default function shareUrl({ children, title, href }) {
  const alert = useAlert();
  const handleClick = useCallback(
    async e => {
      e.preventDefault();
      
      try {
        await navigator.share({ url: href });
      } catch (error) {
        copyToClipboard(href, () => alert('Copied to clipboard'));
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
