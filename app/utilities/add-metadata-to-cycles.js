import constants from '../components/constants';
import calculateTimerTotalSeconds from './calculate-timer-total-seconds';

export default cycles => {
  let index = 0;

  return cycles.reduce((result, cycle, cycleIndex) => {
    const cycleColor = getColor(constants.COLORS.WORK, cycleIndex);
    const totalSeconds = getCycleTotalSeconds(cycle);
    const cycleWithMetadata = cycle.reduce((result, period, periodIndex) => {
      const colors = period.type == 'rest' ? constants.COLORS.REST : constants.COLORS.WORK;
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
