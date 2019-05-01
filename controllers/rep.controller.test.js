const controller = require('./repo.controller');
const { createFakeResponse } = require('../test/utils');
const { repository, pullFake } = require('../test/mocks');
const Repo = require('../models/Repository');
jest.mock('../models/Repository');

describe('Repo Controller Tests', () => {
  let req, res;

  describe('listAll Method', () => {
    beforeEach(() => {
      req = { user: { id: '1234' } };
      res = createFakeResponse();
    });
    it('Should return the correct status code', async () => {
      Repo.find.mockImplementationOnce(() => repository);

      await controller.listAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);

      Repo.find.mockImplementationOnce(() => {
        throw new Error();
      });

      await controller.listAll(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('Should return the correct repository values', async () => {
      Repo.find.mockImplementationOnce(() => repository);

      await controller.listAll(req, res);

      expect(res.send).toHaveBeenCalledWith(repository);
    });
  });

  describe('listPullrequests method', () => {
    beforeEach(() => {
      req = { params: { id: '1234' } };
      res = createFakeResponse();
    });

    it('Should return the correct status code', async () => {
      Repo.find.mockImplementationOnce(() => repository);

      await controller.listPullrequests(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(repository);

      Repo.find.mockImplementationOnce(() => {
        throw new Error();
      });

      await controller.listAll(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
