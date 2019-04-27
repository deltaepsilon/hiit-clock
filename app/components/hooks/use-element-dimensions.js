/* globals window */
import { useEffect, useState } from 'react';
import debounce from '../../utilities/debounce';

export default function useElementDimensions(el) {
  const [boundingClientRect, setBoundingClientRect] = useState({});

  useEffect(() => {
    const handleWindowResize = debounce(() => {
      setBoundingClientRect(el.getBoundingClientRect());
    }, 100);

    el && handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [el]);

  return boundingClientRect;
}
