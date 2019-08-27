import { useCallback, useEffect, useState } from 'react';
import useSettings from './use-settings';
import constants from '../constants';

export default () => {
  const { soundIndex } = useSettings();
  const [audioEl, setAudioEl] = useState(null);
  const playChime = useCallback(async () => {
    try {
      await audioEl.play();
    } catch (error) {
      console.error('audio play error', error);
    }
  }, [audioEl]);

  useEffect(() => {
    const audioEl = document.getElementById('chime');

    setAudioEl(audioEl);
  });

  useEffect(() => {
    const { src } = constants.SOUNDS[soundIndex];
    const audioEl = document.getElementById('chime');

    audioEl.src = src;
  }, [soundIndex]);

  return { playChime };
};
