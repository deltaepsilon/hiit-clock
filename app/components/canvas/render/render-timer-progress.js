import constants from '../../constants';

export default function renderCycleProgress(canvas, { timer, totalSeconds, secondsElapsed }) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const { periods } = timer;
  const percentComplete = Math.round((10000 * secondsElapsed) / totalSeconds) / 10000;
  let i = periods.length;
  let leftX = 0;

  ctx.clearRect(0, 0, width, height);

  while (i--) {
    const period = periods[periods.length - 1 - i];
    const { periodColor, percentOfTotal } = period;
    const rightX = width * percentOfTotal + leftX;
    const insetY = constants.DIMENSIONS.CYCLE_PROGRESS.INSET_PROGRESS;

    ctx.fillStyle = periodColor;

    ctx.fillRect(leftX, insetY, rightX - leftX, height - insetY);

    leftX = rightX;
  }

  ctx.fillStyle = constants.COLORS.PROGRESS_BAR;

  ctx.fillRect(0, 0, width * percentComplete, height);
}
