import constants from '../components/constants';

export default function findCycles({ periods }) {
  const blocksEndingInRest = periods.reduce(
    (acc, period, i, periods) => {
      const isLast = i == periods.length - 1;
      const isRest = period.type == constants.PERIOD_TYPES.REST;

      acc[acc.length - 1].push(period);

      if (!isLast && isRest) {
        acc.push([]);
      }

      return acc;
    },
    [[]]
  );
  let result = blocksEndingInRest;

  if (blocksEndingInRest.length == 1) {
    const singlePeriodCycles = periods.reduce((acc, period) => {
      acc.push([period]);

      return acc;
    }, []);

    result = singlePeriodCycles;
  }

  return result;
}
