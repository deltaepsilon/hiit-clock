import getTimerCycles from './get-timer-cycles';
const powerlifting = require('../data/powerlifting.json');
const tabata = require('../data/tabata.json');

describe('getTimerCycles', () => {
  describe('Powerlifting 5x5', () => {
    let result;

    beforeEach(() => {
      const timer = powerlifting.find(({ name }) => name == 'Powerlifting 5x5');

      result = getTimerCycles(timer);
    });

    it('should have 7 cycles', () => {
      expect(result.length).toEqual(7);
    });

    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
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
});
