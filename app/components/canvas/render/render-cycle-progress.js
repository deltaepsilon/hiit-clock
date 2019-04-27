import constants from '../../constants';

export default function renderCycleProgress(canvas, stats) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const { cycle, cycleSecondsElapsed, cycleTotalSeconds } = stats;
  const cyclePercentComplete = Math.round((100 * cycleSecondsElapsed) / cycleTotalSeconds) / 100;
  let i = cycle.length;
  let leftX = 0;

  ctx.clearRect(0, 0, width, height);

  while (i--) {
    const period = cycle[cycle.length - 1 - i];
    const { periodColor, percentOfCycle } = period;
    const rightX = width * percentOfCycle + leftX;
    const insetY = constants.DIMENSIONS.CYCLE_PROGRESS.INSET_PROGRESS

    ctx.fillStyle = periodColor;

    ctx.fillRect(leftX, insetY, rightX, height - insetY);

    leftX = rightX;
  }

  ctx.fillStyle = constants.COLORS.PROGRESS_BAR;

  ctx.fillRect(
    0,
    0,
    width * cyclePercentComplete,
    height
  );
}
