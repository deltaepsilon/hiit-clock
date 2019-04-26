jest.useFakeTimers();

import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import useTimerState from './use-timer-state';
import calculateTimerTotalSeconds from '../../utilities/calculate-timer-total-seconds';
import uuid from 'uuid/v4';
const powerlifting = require('../../data/powerlifting.json');
import constants from '../constants';

describe('useTimerState', () => {
  let timerId;
  let timer;
  let totalSeconds;
  let wrapper;
  let captureTimerState;
  let effects;

  beforeEach(() => {
    timerId = uuid();
    timer = powerlifting.find(({ name }) => name == 'Powerlifting 5x5');
    totalSeconds = calculateTimerTotalSeconds(timer);
    captureTimerState = jest.fn();

    act(() => {
      wrapper = mount(
        <TimerStateWrapper
          timerId={timerId}
          timer={timer}
          captureTimerState={captureTimerState}
          setEffects={e => (effects = e)}
        />
      );
    });
  });

  it('should initialize with zero seconds', () => {
    expect(captureTimerState).toHaveBeenCalledWith({
      totalSeconds,
      playState: constants.PLAY_STATES.STOPPED,
      secondsElapsed: 0,
    });
  });

  describe('elapsed time', () => {
    it('should NOT elapse time if stopped', () => {
      advanceTimeToSeconds(5);

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 0,
      });
    });

    it('should NOT elapse time if paused', () => {
      captureTimerState.mockClear();

      act(() => effects.pause());

      advanceTimeToSeconds(5);

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.PAUSED,
        secondsElapsed: 0,
      });
    });

    it('should elapse time if playing', () => {
      act(() => effects.play());

      captureTimerState.mockClear();
      advanceTimeToSeconds(5);

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.PLAYING,
        secondsElapsed: 5,
      });
    });

    it('should NOT elapse time while paused', () => {
      act(() => effects.play());
      advanceTimeToSeconds(5);

      act(() => effects.pause());
      advanceTimeToSeconds(5);

      act(() => effects.play());
      advanceTimeToSeconds(5);

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 10,
      });
    });
  });

  describe('skipping', () => {
    it('should skip forward while playing', () => {
      act(() => effects.play());
      advanceTimeToSeconds(5);

      act(() => effects.skipForward());
      act(() => effects.skipForward());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 25,
      });
    });

    it('should skip backward while playing', () => {
      act(() => effects.play());
      advanceTimeToSeconds(100);

      act(() => effects.skipBackward());
      act(() => effects.skipBackward());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 80,
      });
    });
  });

  describe('replay', () => {
    it('should reset to 0 seconds after replay', () => {
      act(() => effects.play());
      advanceTimeToSeconds(100);

      act(() => effects.replay());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 0,
      });
    });
  });

  describe('cycles', () => {
    it('should jump forward one period', () => {
      act(() => effects.play());
      advanceTimeToSeconds(100);

      act(() => effects.forward());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 120,
      });
    });

    it('should handle two quick jumps forward', () => {
      act(() => effects.play());
      advanceTimeToSeconds(1);

      act(() => effects.forward());
      act(() => effects.forward());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 120,
      });
    });

    it('should jump backward one period', () => {
      act(() => effects.play());
      advanceTimeToSeconds(100);

      act(() => effects.backward());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 60,
      });
    });

    it('should handle two quick jumps backward', () => {
      act(() => effects.play());
      advanceTimeToSeconds(121);

      act(() => effects.backward());
      act(() => effects.backward());
      advanceTimeToSeconds();

      captureTimerState.mockClear();
      act(() => effects.stop());

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 60,
      });
    });
  });

  describe('automatic playState changes', () => {
    it('auto-stop one second after', () => {
      act(() => effects.play());
      advanceTimeToSeconds(totalSeconds - 1);
      captureTimerState.mockClear();

      advanceTimeToSeconds(totalSeconds);

      expect(captureTimerState).toHaveBeenCalledWith({
        totalSeconds,
        playState: constants.PLAY_STATES.STOPPED,
        secondsElapsed: 1500,
      });
    });
  });
});

function TimerStateWrapper({ timerId, timer, captureTimerState, setEffects }) {
  const { secondsElapsed, totalSeconds, playState, effects } = useTimerState(timerId, timer, {
    onSecondsElapsed: jest.fn(),
  });

  setEffects(effects);

  captureTimerState({ totalSeconds, playState, secondsElapsed });

  return null;
}

function advanceTimeToSeconds(seconds = 0) {
  const now = Date.now();
  const realDateNow = global.Date.now.bind(global.Date);

  global.Date.now = jest.fn(() => now + 1000 * seconds);

  act(() => jest.advanceTimersByTime(1000 * seconds));

  global.Date.now = realDateNow;
}
