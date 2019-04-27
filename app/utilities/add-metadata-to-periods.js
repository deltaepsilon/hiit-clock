import constants from '../components/constants';
import calculateTimerTotalSeconds from './calculate-timer-total-seconds';

export default periods => {
  const totalSeconds = calculateTimerTotalSeconds({ periods });

  return periods.reduce((result, period, periodIndex) => {
    const colors = period.type == 'rest' ? constants.COLORS.REST : constants.COLORS.WORK;
    const periodColor = getColor(colors, periodIndex);
    const percentOfTotal = Math.round((100000 * period.totalSeconds) / totalSeconds) / 100000;
    const periodWithMetadata = { ...period, periodColor, percentOfTotal };

    return [...result, periodWithMetadata];
  }, []);
};

function getColor(colors, i) {
  return colors[i % colors.length];
}
