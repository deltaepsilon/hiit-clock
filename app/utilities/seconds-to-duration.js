export const SECONDS_PER_SECOND = 1;
export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
export const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;

const designations = [
  ['D', SECONDS_PER_DAY],
  ['H', SECONDS_PER_HOUR],
  ['M', SECONDS_PER_MINUTE],
  ['S', SECONDS_PER_SECOND],
];

export default function secondsToDuration(seconds) {
  let duration = 'P';
  let remainder = seconds;

  designations.forEach(([sign, seconds]) => {
    const value = Math.floor(remainder / seconds);

    remainder = remainder % seconds;

    if (value) {
      duration += `${value}${sign}`;
    }
  });

  if (duration == 'P') {
    duration = 'P0S';
  }

  return duration;
}
