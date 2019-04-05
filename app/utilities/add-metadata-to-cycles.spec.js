import addMetadtaToCycles from './add-metadata-to-cycles';
import getTimerCycles from './get-timer-cycles';
const tabata = require('../data/tabata.json');

describe('addMetadataToCycles', () => {
  describe('Tabata 20/40', () => {
    let result;

    beforeEach(() => {
      const periods = tabata.find(({ name }) => name == 'Tabata 20/40');
      const cycles = getTimerCycles(periods);

      result = addMetadtaToCycles(cycles);
    });

    it('should have 20 cycles', () => {
      expect(result.length).toEqual(20);
    });

    it('should match snapshot', () => {
      expect(result).toMatchSnapshot();
    });
  });
});
