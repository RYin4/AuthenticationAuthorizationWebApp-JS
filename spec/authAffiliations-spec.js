const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000',
  json: true
});

describe('Events API Tests:', function () {

  let jwtTokenAdmin = '';
  let jwtTokenNotAdmin = '';

  beforeAll(function (done) {
    api.post({
      url: '/login',
      body: {
        username: 'JWayne'
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      jwtTokenAdmin = body.token;
      api.post({
        url: '/login',
        body: {
          username: 'JDoe'
        }
      }, function (err, res, body) {
        expect(res.statusCode).toBe(200);
        jwtTokenNotAdmin = body.token;
        done();
      });
    });
  });

  //Create a new Program / Affiliation - Success 
  it('Create a New Program/Affiliation - Successful', function (done) {
    api.post({
      url: '/affiliations',
      body: {


        affiliation_description: "affiliation about football",
        full_name: "football affiliation number 1",
        affiliation_name: "football"


      },
      headers: {
        'Authorization': 'Bearer ' + jwtTokenAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body.affiliation_description).toBe("affiliation about football");
      expect(res.body.full_name).toBe("football affiliation number 1");

      done();
    });
  });

  //Create a new Program / Affiliation - Fail because not admin 
  it('Create a New Program/Affiliation - Fail', function (done) {
    api.post({
      url: '/affiliations',
      body: {


        affiliation_description: "affiliation about engineering",
        full_name: "engineering affiliation number 1"


      },
      headers: {
        'Authorization': 'Bearer ' + jwtTokenNotAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      expect(res.body.msg).toBe("Authorization Error");
      done();
    });
  });


  //Create a New Program / Affilliation - Fail because Not a registered user 
  it('Create a New Program/Affiliation - Fail', function (done) {
    api.post({
      url: '/affiliations',
      body: {


        affiliation_description: "affiliation about engineering",
        full_name: "engineering affiliation number 1"


      },

    }, function (err, res, body) {
      expect(res.statusCode).toBe(401);
      expect(res.body.msg).toBe("Unauthorized");
      done();


    });
  });

  //Edit a new program - success
  it('Edit a new Program/Affiliation - Successful', function (done) {
    api.put({
      url: '/affiliations/000000000000000000000002',
      body: {


        affiliation_description: "affiliation about pokemon",
        full_name: "pokemon affiliation number 1",
        affiliation_name: "pokemon"


      },
      headers: {
        'Authorization': 'Bearer ' + jwtTokenAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe("000000000000000000000002");
      expect(res.body.affiliation_description).toBe("affiliation about pokemon");
      expect(res.body.full_name).toBe("pokemon affiliation number 1");


      done();
    });
  });






});