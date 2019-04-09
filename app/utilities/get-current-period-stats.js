export default (periods, secondsElapsed) => {
  const length = periods.length;
  let accumulatedSeconds = 0;
  let i = length;

  while (i--) {
    const index = length - i - 1;
    const period = periods[index];
    const updatedSeconds = accumulatedSeconds + period.totalSeconds;
    const isOverflowing = updatedSeconds >= secondsElapsed;

    if (!isOverflowing) {
      accumulatedSeconds = updatedSeconds;
    } else {
      return {
        index,
        period,
        periodSecondsElapsed: secondsElapsed - accumulatedSeconds,
        remainder: updatedSeconds - secondsElapsed,
        periods,
        secondsElapsed,
      };
    }
  }

  return null;
};
