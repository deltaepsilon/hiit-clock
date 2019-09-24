import { useEffect, useState } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

const LINK_REGEXP = /<a(\s.*?)>/g

export default function useMarkdown(text = '') {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const rawMarkdown = marked(text);
    const purified = DOMPurify.sanitize(rawMarkdown);
    const withBlankLinks = purified.replace(
      LINK_REGEXP,
      '<a$1 target="_blank" rel="noopener noreferrer">'
    );
    const markdown = withBlankLinks;

    setMarkdown(markdown);
  }, [setMarkdown, text]);

  return markdown;
}
