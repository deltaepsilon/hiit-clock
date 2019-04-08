jest.useFakeTimers();

import React from 'react';
import { mount } from 'enzyme';
import useTimerState from './use-timer-state';
import uuid from 'uuid/v4';
const powerlifting = require('../../data/powerlifting.json');
import constants from '../constants';

describe('useTimerState', () => {
  let timerId;
  let timer;
  let wrapper;

  beforeEach(() => {
    timerId = uuid();
    timer = powerlifting.find(({ name }) => name == 'Powerlifting 5x5');

    wrapper = mount(<TimerStateWrapper timerId={timerId} timer={timer} />);
  });

  it('should initialize with zero seconds', () => {
    const { totalSeconds, playState, secondsElapsed } = getPropsFromWrapper(wrapper);

    console.log('wrapper.debug()', wrapper.debug());

    expect(totalSeconds).toEqual(0);
    expect(playState).toEqual(constants.PLAY_STATES.STOPPED);
    expect(secondsElapsed).toEqual(0);
  });

  describe('elapsed time', () => {
    it('should not elapse time if stopped', () => {
      const { totalSeconds, playState, secondsElapsed } = getPropsFromWrapper(wrapper);

      jest.advanceTimersByTime(1000 * 5);

      expect(totalSeconds).toEqual(0);
      expect(playState).toEqual(constants.PLAY_STATES.STOPPED);
      expect(secondsElapsed).toEqual(0);
    });
  });
});

function TimerStateWrapper({timerId, timer}) {
  const { totalSeconds, playState, secondsElapsed, effects } = useTimerState(timerId, timer);

  return (
    <div
      total-seconds={totalSeconds}
      play-state={playState}
      seconds-elapsed={secondsElapsed}
      effects={effects}
    />
  );
}

function getPropsFromWrapper(wrapper) {
  const props = wrapper.find('div').props();

  return {
    totalSeconds: props['total-seconds'],
    playState: props['play-state'],
    secondsElapsed: props['seconds-elapsed'],
    effects: props.effects,
  };
}
