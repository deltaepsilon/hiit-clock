export default function findCycles({ periods }) {
  let cycles = [];
  let i = periods.length;

  while (i--) {
    const startingIndex = periods.length - i - 1;
    let j = periods.length;
    let smallestMatch;

    while (j--) {
      const endingIndex = j + 1;
      const arrayLength = endingIndex - startingIndex;
      const isEven = !(arrayLength % 2);

      if (arrayLength < 4) break;

      if (isEven) {
        const periodsToMatch = periods.slice(startingIndex, endingIndex);
        const [firstHalf, secondHalf] = getMatchingPeriodsIfMatch(periodsToMatch);

        if (firstHalf) {
          smallestMatch = [firstHalf, secondHalf];
        }
      }
    }

    if (smallestMatch) {
      const [firstHalf, secondHalf] = smallestMatch;
      const combinedLengths = firstHalf.length + secondHalf.length;

      cycles.push(firstHalf);
      cycles.push(secondHalf);

      i = Math.max(0, i - combinedLengths + 1);
    } else {
      cycles.push([periods[startingIndex]]);
    }
  }

  return cycles;
}

function getMatchingPeriodsIfMatch(periods) {
  const [firstHalf, secondHalf] = splitPeriodsInHalf(periods);

  return firstHalf && getPeriodsAreMatch(firstHalf, secondHalf) ? [firstHalf, secondHalf] : [];
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
