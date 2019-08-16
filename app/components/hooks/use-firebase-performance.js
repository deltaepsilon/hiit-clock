/* globals window */
import { useEffect, useState } from 'react';

export default function useFirebasePerformance() {
  const [perf, setPerf] = useState(null);

  useEffect(() => {
    if (typeof window != 'undefined') {
      const perf = window.firebase.performance();

      setPerf(perf);
    }
  }, []);

  return perf;
}
