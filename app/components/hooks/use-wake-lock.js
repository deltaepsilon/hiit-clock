import { useEffect, useState } from 'react';

/**
 * https://developers.google.com/web/updates/2018/12/wakelock
 *
 * wakeLock is experimental and likely doesn't work.
 *
 * Feel free to delete this at any time.
 */

export default function useWakeLock(wakeLockType = 'screen') {
  const [wakeLockObj, setWakeLockObj] = useState(null);

  useEffect(() => {
    (async () => {
      if ('getWakeLock' in navigator) {
        try {
          const wakeLockObj = await navigator.getWakeLock(wakeLockType);
          const wakeLockRequest = wakeLockObj.createRequest();

          setWakeLockObj(wakeLockObj);

          console.info('👍', 'getWakeLock', wakeLockObj);

          return () => wakeLockRequest.cancel();
        } catch (error) {
          console.error('👎', 'getWakeLock', error);
        }
      } else {
        // console.info('👎 getWakeLock not available');
      }
    })();
  }, []);

  return wakeLockObj;
}
