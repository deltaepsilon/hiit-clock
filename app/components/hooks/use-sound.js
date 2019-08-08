import React, { useCallback, useEffect, useState } from 'react';

export default () => {
  const [audioEl, setAudioEl] = useState(null);
  const playChime = useCallback(async () => {
    try {
      await audioEl.play();
    } catch (error) {
      console.error('audio play error', error);
    }
  }, [audioEl]);

  window.playChime = playChime;

  useEffect(() => {
    const audioEl = document.getElementById('chime');

    setAudioEl(audioEl);
  });

  return { playChime };
};
