const WSocket = require('./websockets.controller');
const { createFakeRequest, createFakeResponse } = require('../test/utils');
const mockIo = {
  emit: jest.fn()
};

describe('Web Sockets', () => {
  let instance, req, res;

  beforeEach(() => {
    instance = new WSocket({ io: mockIo });
    req = createFakeRequest('123');
    res = createFakeResponse();
  });

  it('Should emit event', () => {
    //const spy = jest.spyOn(instance, 'reposUpdate');
    instance.reposUpdate(req, res);
    expect(instance.io.emit).toHaveBeenCalledTimes(1);
  });
  it('Repos Update', () => {
    instance.reposUpdate(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
