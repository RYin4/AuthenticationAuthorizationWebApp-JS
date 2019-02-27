const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000',
  json: true
});

describe('Events API Tests:', function () {

  //user login - success 
  it('User Login - Successful', function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'JWayne'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.token).not.toBeNull();
      done();


    });
  });

  //user login - fail because of missing credentials 
  it('User Login - Fail', function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'JLin'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(400);
      expect(body.msg).toBe("Error: users not found");
      done();

    });
  });
});