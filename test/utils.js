function createFakeRequest(id) {
  return {
    user: {
      id
    },
    params: {
      id
    },
    closed_at: null
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

module.exports = { createFakeRequest, createFakeResponse };
