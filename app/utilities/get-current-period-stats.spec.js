import getCurrentPeriodStats from './get-current-period-stats';
import calculateTimerTotalSeconds from './calculate-timer-total-seconds';
const powerlifting = require('../data/powerlifting.json');

describe('getCurrentPeriodStats', () => {
  let totalSeconds;
  let periods;

  beforeEach(() => {
    const timer = powerlifting.find(({ name }) => name == 'Powerlifting 5x5');

    totalSeconds = calculateTimerTotalSeconds(timer);

    periods = timer.periods;
  });

  it('just past midway through first period', () => {
    const result = getCurrentPeriodStats(periods, 31);

    expect(result).toEqual({
      index: 0,
      period: periods[0],
      periodSecondsElapsed: 31,
      remainder: 29,
      periods,
      secondsElapsed: 31,
    });
  });

  it('just past midway through first period', () => {
    const result = getCurrentPeriodStats(periods, 31);

    expect(result).toEqual({
      index: 0,
      period: periods[0],
      periodSecondsElapsed: 31,
      remainder: 29,
      periods,
      secondsElapsed: 31,
    });
  });

  it('one second into last period', () => {
    const lastPeriodIndex = periods.length - 1;
    const lastPeriod = periods[lastPeriodIndex];
    const secondsElapsed = totalSeconds - lastPeriod.totalSeconds + 1;
    const result = getCurrentPeriodStats(periods, secondsElapsed);

    expect(result).toEqual({
      index: lastPeriodIndex,
      period: lastPeriod,
      periodSecondsElapsed: 1,
      remainder: lastPeriod.totalSeconds - 1,
      periods,
      secondsElapsed,
    });
  });

  it('one second before end of last period', () => {
    const lastPeriodIndex = periods.length - 1;
    const lastPeriod = periods[lastPeriodIndex];
    const secondsElapsed = totalSeconds - 1;
    const result = getCurrentPeriodStats(periods, secondsElapsed);

    expect(result).toEqual({
      index: lastPeriodIndex,
      period: lastPeriod,
      periodSecondsElapsed: lastPeriod.totalSeconds - 1,
      remainder: 1,
      periods,
      secondsElapsed,
    });
  });

  it('at last second of last period', () => {
    const lastPeriodIndex = periods.length - 1;
    const lastPeriod = periods[lastPeriodIndex];
    const secondsElapsed = totalSeconds;
    const result = getCurrentPeriodStats(periods, secondsElapsed);

    expect(result).toEqual({
      index: lastPeriodIndex,
      period: lastPeriod,
      periodSecondsElapsed: lastPeriod.totalSeconds,
      remainder: 0,
      periods,
      secondsElapsed,
    });
  });

  it('too many seconds', () => {
    const secondsElapsed = totalSeconds + 1;
    const result = getCurrentPeriodStats(periods, secondsElapsed);

    expect(result).toEqual(null);
  });
});
