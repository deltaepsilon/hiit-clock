import constants from '../components/constants';

export default cycles => {
  return cycles.reduce((result, cycle, cycleIndex) => {
    const cycleColor = getColor(constants.COLORS.WORK, cycleIndex);
    const cycleWithMetadata = cycle.reduce((result, period, periodIndex) => {
      const colors = period.type == 'rest' ? constants.COLORS.REST : constants.COLORS.WORK;
      const periodColor = getColor(colors, cycleIndex + periodIndex);
      const periodWithMetadata = { ...period, cycleColor, periodColor };

      return [...result, periodWithMetadata];
    }, []);

    cycleWithMetadata.cycleColor = cycleColor;

    return [...result, cycleWithMetadata];
  }, []);
};

function getColor(colors, i) {
  return colors[i % colors.length];
}
