import secondsToDuration, {
  SECONDS_PER_SECOND,
  SECONDS_PER_MINUTE,
  SECONDS_PER_HOUR,
  SECONDS_PER_DAY,
} from './seconds-to-duration';

describe('secondsToDuration', () => {
  describe('even units', () => {
    it('should handle days', () => {
      let i = 10;

      while (--i) {
        expect(secondsToDuration(SECONDS_PER_DAY * i)).toEqual(`P${i}D`);
      }
    });

    it('should handle hours', () => {
      let i = 10;

      while (--i) {
        expect(secondsToDuration(SECONDS_PER_HOUR * i)).toEqual(`P${i}H`);
      }
    });

    it('should handle minutes', () => {
      let i = 10;

      while (--i) {
        expect(secondsToDuration(SECONDS_PER_MINUTE * i)).toEqual(`P${i}M`);
      }
    });

    it('should handle seconds', () => {
      let i = 10;

      while (--i) {
        expect(secondsToDuration(SECONDS_PER_SECOND * i)).toEqual(`P${i}S`);
      }
    });

    it('should handle zero seconds', () => {
      expect(secondsToDuration(0)).toEqual('P0S');
    });
  });

  describe('uneven', () => {
    it('should break across periods', () => {
      let days = 2;

      while (days--) {
        let hours = 24;

        while (hours--) {
          let minutes = 60;

          while (minutes--) {
            testDuration({ days, hours, minutes, seconds: 59 });
            testDuration({ days, hours, minutes, seconds: 1 });
          }
        }
      }
    });
  });
});

function testDuration({ days, hours, minutes, seconds }) {
  const totalSeconds =
    days * SECONDS_PER_DAY +
    hours * SECONDS_PER_HOUR +
    minutes * SECONDS_PER_MINUTE +
    seconds * SECONDS_PER_SECOND;
  const expected = `P${days}D${hours}H${minutes}M${seconds}S`.replace(/(?<=\D)0\w/g, '');
  const result = secondsToDuration(totalSeconds);

  if (result != expected) {
    console.info({ totalSeconds, expected, result });
  }

  expect(result).toEqual(expected);
}
