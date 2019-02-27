const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000',
  json: true
});

describe('Users API Tests:', function () {

  //User registrations - success
  it('User Registration - Successful', function (done) {
    api.post({
      url: '/users',
      body: {
        email: "Jackie@localhost",
        first_name: "Jackie",
        last_name: "Chan",
        password: "1234",
        username: "JChan",
        organization_id: "000000000000000000000001",
        position_id: "000000000000000000000001",
        title_id: "000000000000000000000001",
        role_id: "000000000000000000000001"
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body.email).toBe("Jackie@localhost");
      expect(res.body.first_name).toBe("Jackie");
      expect(res.body.last_name).toBe("Chan");
      expect(res.body.username).toBe("JChan");
      expect(res.body.organization_id).toBe("000000000000000000000001");
      expect(res.body.position_id).toBe("000000000000000000000001");
      expect(res.body.title_id).toBe("000000000000000000000001");
      expect(res.body.role_id).toBe("000000000000000000000001");
      done();
    });
  });

  //user registration - fail missing fields
  it('User Registration - Fail', function (done) {
    api.post({
      url: '/users',
      body: {
        email: "Jackie@localhost",
        first_name: "Jackie",
        last_name: "Chan",
        password: "1234",
        organization_id: "000000000000000000000001",
        position_id: "000000000000000000000001",
        title_id: "000000000000000000000001",
        role_id: "000000000000000000000001"
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(400);
      expect(res.body.msg).toBe("Missing Username Field");
      done();
    });
  });



});