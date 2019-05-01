const request = require('supertest');
const app = require('../server');

//afterEach(() => {});

describe('routes', () => {
  // it('should respond as expected, no endpoint definition at /', async () => {
  //   const response = await request(server).get('/');
  //   expect(response.status).toEqual(404);
  // // });
  // it('Should return', done => {
  //   request(server)
  //     .post('/repos/socket')
  //     .send({
  //       _id: '5cc3275306ceea6b73b37f95',
  //       socket: []
  //     })
  //     .set('Accept', 'application/json')
  //     .expect(200, done);
  // });

  it('Should return', () => {
    // const token =
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTY2OTYyODgsImV4cCI6MTU1NjY5OTg4OCwiYXVkIjoicHJkYXNoYm9hcmQuY29tIiwiaXNzIjoiYXBwLnByZGFzaGJvYXJkLmNvbSIsInN1YiI6IjEyMzQifQ.reS6DfQaV_OUDJ1X78E-hnNjfw5MNdCTerbkiS8otaA';
    request(app)
      .get('/v3/pullrequests')
      .set('Accept', 'application/json')
      // .set('Authorization', `jwt ${token}`)
      .expect(200)
      .end()
  });
});
