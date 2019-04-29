const controller = require('./user.controller');
import { me } from './user.controller';
const UserModel = require('../models/User');

describe('User Controller', () => {
  let User;

  beforeEach(() => {
    User = generateFakeUserModel();
    jest.mock('./user.controller.js', () => {
      me: jest.fn();
    });
  });

  it('does set correct status', async () => {
    const req = createFakeRequest('1234');
    const res = createFakeResponse();
    console.log(await controller.me(req, res));
    await controller.me(req, res);
    expect(controller.me).toHaveBeenCalledWith(req, res);
  });

  it('does set correct body', () => {});

  it("doesn't break passing no id", () => {});
});
// Create fake "User" model
// having .find() function
const fakeUser = {
  _id: '1234',
  loginName: 'konstantin',
  displayName: 'Konstantin',
  email: 'k@gmail.com',
  picture: 'konstantin.jpg',
  webUrl: 'https://www.konstantin.com'
};

function generateFakeUserModel() {
  return {
    find: jest.fn(() => fakeUser)
  };
}

function createFakeRequest(id) {
  return {
    user: {
      id
    }
  };
}

function createFakeResponse() {
  const res = {};
  Object.assign(res, {
    status: jest.fn(
      function status() {
        return this;
      }.bind(res)
    ),
    send: jest.fn(
      function send() {
        return this;
      }.bind(res)
    )
  });
  return res;
}

// test('Me returns the specific User', async () => {
//   const { req, res } = setup();
//   await controller.me(req, res);

//   expect(res.send).toHaveBeenCalledTimes(1);
//   console.log(res.status.mock.calls);
//   expect(res.status).toHaveBeenCalledTimes(1);
// });

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
