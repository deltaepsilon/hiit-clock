const uuid = require('uuid/v4');
const context = require('../utilities/test-context');
const Func = require('./file-delete');
const dbTimer = require('../data/db-timer.json');

describe('FileDelete', () => {
  let deleteFunc;

  beforeEach(() => {
    deleteFunc = jest.fn();

    context.admin = {
      storage: () => ({
        bucket: () => ({ file: filepath => ({ delete: () => deleteFunc(filepath) }) }),
      }),
    };
  });

  describe('duplicate files', () => {
    describe('top-level duplicate removed', () => {
      beforeEach(async () => {
        const func = Func(context);
        const change = {
          before: { data: () => cloneObject(dbTimer) },
          after: {
            data: () => ({ ...cloneObject(dbTimer), file: {} }),
          },
        };

        await func(change);
      });

      it('should NOT delete the deleted top-level file', () => {
        expect(deleteFunc).toHaveBeenCalledTimes(0);
      });
    });

    describe('period duplicate removed', () => {
      beforeEach(async () => {
        const func = Func(context);
        const change = {
          before: { data: () => cloneObject(dbTimer) },
          after: {
            data: () => {
              const timer = cloneObject(dbTimer);

              timer.periods = timer.periods.map(period => ({ ...period, file: {} }));

              return timer;
            },
          },
        };

        await func(change);
      });

      it('should delete the deleted top-level file', () => {
        expect(deleteFunc).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('file removals', () => {
    describe('top-level file removed', () => {
      let fullPath;

      beforeEach(async () => {
        fullPath = uuid();

        const func = Func(context);
        const change = {
          before: {
            data: () => ({ ...cloneObject(dbTimer), file: { metadata: { fullPath } } }),
          },
          after: {
            data: () => ({ ...cloneObject(dbTimer), file: {} }),
          },
        };

        await func(change);
      });

      it('should delete the period file', () => {
        expect(deleteFunc).toHaveBeenCalledTimes(1);
        expect(deleteFunc).toHaveBeenCalledWith(fullPath);
      });
    });

    describe('period file removed', () => {
      let fullPath;

      beforeEach(async () => {
        fullPath = uuid();

        const func = Func(context);
        const change = {
          before: {
            data: () => {
              const timer = cloneObject(dbTimer);

              timer.periods.push({ file: { metadata: { fullPath } } });

              return timer;
            },
          },
          after: {
            data: () => cloneObject(dbTimer),
          },
        };

        await func(change);
      });

      it('should delete the period file', () => {
        expect(deleteFunc).toHaveBeenCalledTimes(1);
        expect(deleteFunc).toHaveBeenCalledWith(fullPath);
      });
    });
  });

  describe('file changes', () => {
    describe('top-level file changed', () => {
      let fullPath;

      beforeEach(async () => {
        fullPath = uuid();

        const func = Func(context);

        const change = {
          before: { data: () => ({ ...cloneObject(dbTimer), file: { metadata: { fullPath } } }) },
          after: { data: () => cloneObject(dbTimer) },
        };

        await func(change);
      });

      it('should delete the changed top-level file', () => {
        expect(deleteFunc).toHaveBeenCalledTimes(1);
        expect(deleteFunc).toHaveBeenCalledWith(fullPath);
      });
    });

    describe('period file changed', () => {
      beforeEach(async () => {
        const func = Func(context);

        const change = {
          before: {
            data: () => cloneObject(dbTimer),
          },
          after: {
            data: () => {
              const timer = cloneObject(dbTimer);

              timer.periods = timer.periods.map(() => ({
                file: { metadata: { fullPath: uuid() } },
              }));

              timer.file = { metadata: { fullPath: uuid() } };

              return timer;
            },
          },
        };

        await func(change);
      });

      it('should delete the changed period file', () => {
        const periodWithFile = dbTimer.periods.find(({ file }) => !!file.metadata);

        expect(deleteFunc).toHaveBeenCalledTimes(1);
        expect(deleteFunc).toHaveBeenCalledWith(periodWithFile.file.metadata.fullPath);
      });
    });
  });
});

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}
