import React, { useContext, useEffect, useRef } from 'react';
import { TimerContext } from '../contexts/timer-context';
import constants from '../constants';

const MEDIA_SESSION_STATES = {
  NONE: 'none',
  PAUSED: 'paused',
  PLAYING: 'playing',
};

export default () => {
  const audioRef = useRef(null);
  const { effects, playState, timer } = useContext(TimerContext);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', effects.play);
      navigator.mediaSession.setActionHandler('pause', effects.pause);
      navigator.mediaSession.setActionHandler('seekbackward', effects.skipBackward);
      navigator.mediaSession.setActionHandler('seekforward', effects.skipForward);
      navigator.mediaSession.setActionHandler('previoustrack', effects.backward);
      navigator.mediaSession.setActionHandler('nexttrack', effects.forward);
    }
  }, [effects]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: timer.name,
        artist: 'HiiT Clock',
        artwork: [
          { src: '/images/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
          { src: '/images/icons/icon-128.png', sizes: '128x128', type: 'image/png' },
          { src: '/images/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/images/icons/icon-384.png', sizes: '384x384', type: 'image/png' },
          { src: '/images/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      });

      return () => {
        navigator.mediaSession.playbackState = MEDIA_SESSION_STATES.NONE;
      };
    }
  }, [timer]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      const playbackState =
        playState == constants.PLAY_STATES.PLAYING
          ? MEDIA_SESSION_STATES.PLAYING
          : MEDIA_SESSION_STATES.PAUSED;

      navigator.mediaSession.playbackState = playbackState;

      if (audioRef.current.readyState) {
        if (playState == constants.PLAY_STATES.PLAYING) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    }
  }, [playState]);

  return <audio ref={audioRef} src="/sounds/30-seconds-of-silence.mp3" loop preload />;
};
