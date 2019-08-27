import constants from '../components/constants';
import calculateTimerTotalSeconds from './calculate-timer-total-seconds';

const COLORS_MAP = {
  [constants.PERIOD_TYPES.PREPARE]: constants.COLORS.PREPARE,
  [constants.PERIOD_TYPES.WORK]: constants.COLORS.WORK,
  [constants.PERIOD_TYPES.REST]: constants.COLORS.REST,
};

export default cycles => {
  let index = 0;

  return cycles.reduce((result, cycle, cycleIndex) => {
    const isPrepareCycle = cycle[0] && cycle[0].type == constants.PERIOD_TYPES.PREPARE;
    const cycleColors = isPrepareCycle ? constants.COLORS.PREPARE : constants.COLORS.WORK;
    const cycleColor = getColor(cycleColors, cycleIndex);
    const totalSeconds = getCycleTotalSeconds(cycle);
    const cycleWithMetadata = cycle.reduce((result, period, periodIndex) => {
      const colors = COLORS_MAP[period.type];
      const periodColor = getColor(colors, cycleIndex + periodIndex);
      const percentOfCycle = Math.round((1000 * period.totalSeconds) / totalSeconds) / 1000;
      const periodWithMetadata = {
        ...period,
        cycleColor,
        periodColor,
        percentOfCycle,
        periodIndex: index++,
      };

      return [...result, periodWithMetadata];
    }, []);

    cycleWithMetadata.cycleColor = cycleColor;
    cycleWithMetadata.index = cycleIndex;

    return [...result, cycleWithMetadata];
  }, []);
};

function getColor(colors, i) {
  return colors[i % colors.length];
}

function getCycleTotalSeconds(cycle) {
  return calculateTimerTotalSeconds({ periods: cycle });
}
