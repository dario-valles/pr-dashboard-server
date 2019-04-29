const controller = require('./pullrequest.controller');
const Pullrequest = require('../models/Pullrequest');
const { createFakeRequest, createFakeResponse } = require('../test/utils');
const { fakePReq } = require('../test/mocks');
jest.mock('../models/Pullrequest');

describe('Pull Request Controller', () => {
  let req, res;
  beforeEach(() => {
    res = createFakeResponse();
  });

  describe('All requests', () => {
    it('finds and sends back a retrieved pullrequest', async () => {
      Pullrequest.find.mockImplementationOnce(() => fakePReq);
      req = createFakeRequest('1234');
      await controller.listAll(req, res);
      expect(res.send).toHaveBeenCalledWith(fakePReq)
    });
  
    it('sends back the correct status', async () => {
      Pullrequest.find.mockImplementationOnce(() => fakePReq);
      req = createFakeRequest('1234');
      await controller.listAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200)

      Pullrequest.find.mockImplementationOnce(() => '');
      req = createFakeRequest('xxx');
      await controller.listAll(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });

  })

  describe('Seen requests', () => {
    it('sends back the correct status', async () => {
      Pullrequest.findOneAndUpdate.mockImplementationOnce(() => fakePReq);

      req = createFakeRequest('1234');

      await controller.seen(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200)
    })
  })
});


