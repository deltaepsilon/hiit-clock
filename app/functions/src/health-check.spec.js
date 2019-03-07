const context = require('../utilities/test-context');
const Func = require('./health-check');
const httpMocks = require('node-mocks-http');

describe('HealthCheck', () => {
  let func;
  let res;

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

  it('should return the test environment', () => {
    const json = JSON.parse(res._getData());

    expect(json.environment).toEqual(context.environment.environment);
  });
});
