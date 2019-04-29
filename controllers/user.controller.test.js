const controller = require('./user.controller');
const User = require('../models/User');
const { createFakeRequest, createFakeResponse } = require('../test/utils');
const { fakeUser } = require('../test/mocks');
jest.mock('../models/User');

describe('User Controller', () => {
  let req, res;
  beforeEach(() => {
    res = createFakeResponse();
  });

  it('does set correct status', async () => {
    User.find.mockImplementationOnce(() => fakeUser);
    req = createFakeRequest('1234');

    await controller.me(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

    User.find.mockImplementationOnce(() => {
      throw new Error();
    });
    await controller.me(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('does set correct body', async () => {
    User.find.mockImplementationOnce(() => fakeUser);
    req = createFakeRequest('1234');

    await controller.me(req, res);

    expect(res.send).toHaveBeenCalledWith(fakeUser);
  });
});

// Create fake "User" model
// having .find() function
// mock ../models/User.js
// 1. Setup
//    Create mock req, res
//    const res = { status: jest.fn(), send: jest.fn() }
//    const fakeUser = { id: 4 };
//    User.find = jest.fn(() => fakeUser);
//    const expected = [{ _id: fakeUser._id }, fakeUser]
// 2. Action
//    const result = controller.me(req, res)
// 3. Assertions
//    expect(res.status.mock.calls).toEqual([[200]]);
//    expect(result.send).toHaveBeenCalledWith(fakeUser);
//    expect(User.find.mock.calls).toEqual(expected);
