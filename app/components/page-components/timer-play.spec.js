jest.useFakeTimers();
jest.mock('../hooks/use-alert', () => jest.fn());
jest.mock('../timer/timer-top-bar', () => () => null);
jest.mock('../timer/timer-progress-bars', () => () => null);
jest.mock('../hooks/use-timer', () =>
  jest.fn(() => {
    const timer = require('../../data/timers/row.json');

    return timer;
  })
);

import React from 'react';
import uuid from 'uuid/v4';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import TimerProvider from '../contexts/timer-context';
import TimerPlay from './timer-play';

import constants from '../constants';

describe('TimerPlay', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      timerId: uuid(),
      userId: uuid(),
    };
    wrapper = mount(<TimerPlay {...props} />);
  });

  describe('playing', () => {
    const fiveSeconds = 5;

    beforeEach(() => {
      const play = wrapper.find('#timer-controls-play').prop('onClick');

      act(() => play());

      wrapper.update();
    });

    it('should start playing at 0 seconds', () => {
      const { timerState } = getTimerProviderProps(wrapper);

      expect(timerState.playState).toEqual(constants.PLAY_STATES.PLAYING);
      expect(timerState.secondsElapsed).toEqual(0);
    });

    it('should track five seconds', () => {
      advanceTimeToSeconds(fiveSeconds);

      const { timerState } = getTimerProviderProps(wrapper);

      expect(timerState.playState).toEqual(constants.PLAY_STATES.PLAYING);
      expect(timerState.secondsElapsed).toEqual(fiveSeconds);
    });

    it('should track 15 seconds with 5 second advances', () => {
      advanceTimeToSeconds(fiveSeconds * 1);
      advanceTimeToSeconds(fiveSeconds * 2);
      advanceTimeToSeconds(fiveSeconds * 3);

      const { timerState } = getTimerProviderProps(wrapper);

      expect(timerState.playState).toEqual(constants.PLAY_STATES.PLAYING);
      expect(timerState.secondsElapsed).toEqual(fiveSeconds * 3);
    });

    it('should track 15 seconds with 5 seconds unmounted', () => {
      advanceTimeToSeconds(fiveSeconds * 1);

      wrapper.unmount();

      advanceTimeToSeconds(fiveSeconds * 2);

      wrapper.mount();

      advanceTimeToSeconds(fiveSeconds * 3);

      const { timerState } = getTimerProviderProps(wrapper);

      expect(timerState.playState).toEqual(constants.PLAY_STATES.PLAYING);
      expect(timerState.secondsElapsed).toEqual(fiveSeconds * 3);
    });

    it('should track 25 seconds with 10 seconds unmounted', () => {
      advanceTimeToSeconds(fiveSeconds * 1);

      wrapper.unmount();

      advanceTimeToSeconds(fiveSeconds * 2);

      wrapper.mount();

      advanceTimeToSeconds(fiveSeconds * 3);

      wrapper.unmount();

      advanceTimeToSeconds(fiveSeconds * 4);

      wrapper.mount();

      advanceTimeToSeconds(fiveSeconds * 5);

      const { timerState } = getTimerProviderProps(wrapper);

      expect(timerState.playState).toEqual(constants.PLAY_STATES.PLAYING);
      expect(timerState.secondsElapsed).toEqual(fiveSeconds * 5);
    });
  });

  function getTimerProviderProps(wrapper) {
    wrapper.update();

    return wrapper.find(TimerProvider).props();
  }
});

function advanceTimeToSeconds(seconds = 0) {
  const now = Date.now();
  const realDateNow = global.Date.now.bind(global.Date);

  global.Date.now = jest.fn(() => now + 1000 * seconds);

  act(() => jest.advanceTimersByTime(1000 * seconds));

  global.Date.now = realDateNow;
}
