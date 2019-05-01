const request = require('supertest');
const serverPromise = require('../server');
let server;

const tokenJWT =
  'jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTY3MDY1OTEsImV4cCI6MTU4ODI2NDE5MSwiYXVkIjoicHJkYXNoYm9hcmQuY29tIiwiaXNzIjoiYXBwLnByZGFzaGJvYXJkLmNvbSIsInN1YiI6IjVjYzMyNzUzMDZjZWVhNmI3M2IzN2Y5NSJ9.12agPaNOnkWh4I1dUw0Vd6qFBytmMHRl5qtc0wR3W1A';

beforeAll(async () => {
  server = await serverPromise;
});

afterAll(async () => {
  console.log('CLOSING SERVER XXXXXXXXXX');
  await server.tearDown();
  console.log('SERVER CLOSED =========');
});

describe('GET /pullrequests', () => {
  it('get all pull requests', async () => {
    await request(server)
      .get('/v3/pullrequests')
      .set('Authorization', tokenJWT)
      .expect(200);
  });
});
