const context = require('../../../utilities/test-context');
const Func = require('./sitemap');
const httpMocks = require('node-mocks-http');
const getAlgoliaIndices = require('../../../utilities/get-algolia-indices');
const uuid = require('uuid/v4');

describe('Sitemap', () => {
  let func;
  let res;
  let timersIndex;

  beforeAll(done => {
    timersIndex = getAlgoliaIndices(context).timers;

    const taskId = timersIndex.addObject({ uid: uuid(), name: uuid(), totalSeconds: 60 });

    timersIndex.waitTask(taskId, () => done());
  });

  beforeEach(async () => {
    const req = httpMocks.createRequest({
      method: 'GET',
    });

    res = httpMocks.createResponse();

    func = Func(context);

    await func(req, res);
  });

  it('should return a 200', () => {
    expect(res.statusCode).toEqual(200);
  });

  it('should return records', () => {
    const text = res._getData();
    const lines = text.split('\n');

    expect(lines.length > 6).toEqual(true);
  });
});
