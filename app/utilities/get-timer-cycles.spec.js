import getTimerCycles from './get-timer-cycles';

const powerlifting = require('../data/powerlifting.json');
const tabata = require('../data/tabata.json');
const sideSplitsPeriods = require('../data/side-splits.json');

describe('getTimerCycles', () => {
  describe('Powerlifting 5x5', () => {
    const expectedCycleCount = 7;
    let result;

    beforeEach(() => {
      const timer = powerlifting.find(({ name }) => name == 'Powerlifting 5x5');

      result = getTimerCycles(timer);
    });

    it(`should have ${expectedCycleCount} cycles`, () => {
      expect(result.length).toEqual(expectedCycleCount);
    });

    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });

  describe('Powerlifting 5x5 without ending rest period', () => {
    const expectedCycleCount = 7;
    let result;

    beforeEach(() => {
      const timer = powerlifting.find(({ name }) => name == 'Powerlifting 5x5');

      timer.periods.pop();

      result = getTimerCycles(timer);
    });

    it(`should have ${expectedCycleCount} cycles`, () => {
      expect(result.length).toEqual(expectedCycleCount);
    });

    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });

  describe('Powerlifting 2x2', () => {
    const expectedCycleCount = 4;
    let result;

    beforeEach(() => {
      const timer = powerlifting.find(({ name }) => name == 'Powerlifting 2x2');

      result = getTimerCycles(timer);
    });

    it(`should have ${expectedCycleCount} cycles`, () => {
      expect(result.length).toEqual(expectedCycleCount);
    });
  });

  describe('Tabata 20/40', () => {
    let result;

    beforeEach(() => {
      const timer = tabata.find(({ name }) => name == 'Tabata 20/40');

      result = getTimerCycles(timer);
    });

    it('should have 20 cycles', () => {
      expect(result.length).toEqual(20);
    });

    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });

  describe('Side Splits', () => {
    let result;

    beforeEach(() => {
      result = getTimerCycles({ periods: sideSplitsPeriods });
    });

    it('should have 10 cycles', () => {
      expect(result.length).toEqual(10);
    });

    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });
});
