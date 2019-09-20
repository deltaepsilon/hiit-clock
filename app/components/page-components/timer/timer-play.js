import React, { useEffect, useState } from 'react';
import useTimer from '../../hooks/use-timer';
import useTimerState from '../../hooks/use-timer-state';
import useWakeLock from '../../hooks/use-wake-lock';
import Advertisement from '../../advertisement/advertisement';
import MediaSession from '../../media-session/media-session';
import TimerTopBar from '../../timer/timer-top-bar';
import TimerProgressBars from '../../timer/timer-progress-bars';
import TimerProgressDetails from '../../timer/timer-progress-details';
import TimerControls from '../../timer/timer-controls';
import TimerSound from '../../timer/timer-sound';
import TimerFlash from '../../timer/timer-flash';
import TimerProvider from '../../contexts/timer-context';
import useAlert from '../../hooks/use-alert';
import './timer-play.css';

export default function TimerPlay({ timerId, userId }) {
  const alert = useAlert();
  const [mediaSessionEnabled, setMediaSessionEnabled] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [showAdvertisement, setShowAdvertisement] = useState(false);
  const timer = useTimer({ timerId, userId });
  const timerState = useTimerState(timerId, timer, {
    onSecondsElapsed: seconds => setSecondsElapsed(seconds),
  });

  useEffect(() => {
    if (mediaSessionEnabled) {
      alert('Android media controls enabled.');
    }
  }, [mediaSessionEnabled]);

  useEffect(() => {
    const isTimerComplete = timerState.secondsElapsed == timerState.totalSeconds;
    const shouldShowAdvertisement = isTimerComplete;

    if (shouldShowAdvertisement != showAdvertisement) {
      setShowAdvertisement(shouldShowAdvertisement);
    }
  }, [showAdvertisement, setShowAdvertisement, timerState]);

  useWakeLock('screen');

  return (
    <TimerProvider
      secondsElapsed={secondsElapsed}
      timer={timer}
      timerId={timerId}
      timerState={timerState}
      userId={userId}
    >
      <div id="timer-play">
        <TimerTopBar
          mediaSessionEnabled={mediaSessionEnabled}
          onMediaSessionClick={() => setMediaSessionEnabled(x => !x)}
        />
        <div id="timer-details-container">
          <TimerProgressBars />
          <TimerProgressDetails />
        </div>
        <TimerControls />
        <TimerSound />
        <TimerFlash />
        <Advertisement show={showAdvertisement} />
        {mediaSessionEnabled && <MediaSession />}
      </div>
    </TimerProvider>
  );
}
