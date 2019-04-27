import calculateTimerTotalSeconds from './calculate-timer-total-seconds';

export default (cycles, { timer, secondsElapsed }) => {
  const length = cycles.length;
  let accumulatedSeconds = 0;
  let i = length;

  const totalSeconds = calculateTimerTotalSeconds(timer);

  while (i--) {
    const index = length - i - 1;
    const cycle = cycles[index];
    const cycleTotalSeconds = getCycleTotalSeconds(cycle);
    const updatedSeconds = accumulatedSeconds + cycleTotalSeconds;
    const isOverflowing = updatedSeconds >= secondsElapsed;

    if (!isOverflowing) {
      accumulatedSeconds = updatedSeconds;
    } else {
      return {
        index,
        cycle,
        cycles,
        cycleSecondsElapsed: secondsElapsed - accumulatedSeconds,
        cycleTotalSeconds,
        remainder: updatedSeconds - secondsElapsed,
        secondsElapsed,
        totalSeconds,
      };
    }
  }

  return null;
};

function getCycleTotalSeconds(cycle) {
  return calculateTimerTotalSeconds({ periods: cycle });
}
