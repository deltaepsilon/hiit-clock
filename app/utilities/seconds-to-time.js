export default (totalSeconds, minimal = false) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minutesPadded = String(minutes).padStart(2, '0');
  const secondsPadded = String(seconds).padStart(2, '0');
  const hideMinutes = minimal && !minutes;

  return `${hideMinutes ? '' : minutesPadded}:${secondsPadded}`;
};
