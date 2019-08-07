import constants from '../components/constants';

export default function findCycles({ periods }) {
  const periodsLastIndex = periods.length - 1;
  const cycles = [];
  let i = periods.length;

  while (i--) {
    const startingIndex = periodsLastIndex - i;
    let j = periods.length;
    let smallestMatch;
    let workRestMatch;

    while (j--) {
      const endingIndex = j + 1;
      const arrayLength = endingIndex - startingIndex;
      const isEven = !(arrayLength % 2);
      const periodsToMatch = periods.slice(startingIndex, endingIndex);

      if (arrayLength < 4) {
        break;
      }

      if (isEven) {
        const [firstHalf, secondHalf] = getMatchingPeriodsIfMatch(periodsToMatch);

        if (firstHalf) {
          smallestMatch = [firstHalf, secondHalf];
        } else if (arrayLength == 4) {
          workRestMatch = getWorkRestMatch(periodsToMatch);
        }
      }
    }

    if (smallestMatch) {
      const [firstHalf, secondHalf] = smallestMatch;
      const combinedLengths = firstHalf.length + secondHalf.length;

      cycles.push(firstHalf);
      cycles.push(secondHalf);

      i = Math.max(0, i - combinedLengths + 1);
    } else if (workRestMatch) {
      cycles.push(workRestMatch);

      i = Math.max(0, i - workRestMatch.length + 1);
    } else {
      cycles.push([periods[startingIndex]]);
    }
  }

  const cyclesWithoutDanglingRest = consolidateDanglingRestPeriod(cycles);

  return cyclesWithoutDanglingRest;
}

function getMatchingPeriodsIfMatch(periods) {
  const [firstHalf, secondHalf] = splitPeriodsInHalf(periods);

  return firstHalf && getPeriodsAreMatch(firstHalf, secondHalf) ? [firstHalf, secondHalf] : [];
}

function getWorkRestMatch(periods) {
  const [firstPeriod, secondPeriod] = periods;
  const firstIsWork = firstPeriod.type == constants.PERIOD_TYPES.WORK;
  const secondIsRest = secondPeriod.type == constants.PERIOD_TYPES.REST;

  return firstIsWork && secondIsRest && [firstPeriod, secondPeriod];
}

function splitPeriodsInHalf(periods) {
  const index = periods.length / 2;
  const firstHalf = periods.slice(0, index);
  const secondHalf = periods.slice(index);

  return firstHalf.length && firstHalf.length == secondHalf.length ? [firstHalf, secondHalf] : [];
}

function getPeriodsAreMatch(aPeriods, bPeriods) {
  const aString = aPeriods.map(getStringPeriod).join();
  const bString = bPeriods.map(getStringPeriod).join();

  return aString == bString;
}

function getStringPeriod(period) {
  return `${period.totalSeconds}|${period.type}`;
}

function consolidateDanglingRestPeriod(incomingCycles) {
  const cycles = [...incomingCycles];
  let i = cycles.length;

  while (i--) {
    const cycle = cycles[i];
    const nextCycle = cycles[i + 1];
    const bothCyclesAreSingles = cycle.length == 1 && nextCycle && nextCycle.length == 1;

    if (bothCyclesAreSingles) {
      const period = cycle[0];
      const nextPeriod = nextCycle[0];
      const periodIsWork = period.type == constants.PERIOD_TYPES.WORK;
      const nextPeriodIsRest = nextPeriod.type == constants.PERIOD_TYPES.REST;

      if (periodIsWork && nextPeriodIsRest) {
        cycles[i].push(nextPeriod);
        cycles.splice(i + 1, 1);
      }
    }
  }

  return cycles;
}
