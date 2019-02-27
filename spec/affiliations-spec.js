const request = require("request");

const api = request.defaults({
  baseUrl: 'http://localhost:3000',
  json: true
});


describe('Events API Tests:', function () {

  //Get all Program / Affiliation 
  it('Get all programs/affiliations - Successful', function (done) {
    api.get({
      url: '/affiliations'

    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.length).toBeGreaterThanOrEqual(2);
      done();
    });
  });

  //Get a Program / Affiliation by id
  it('Get program/affiliation by id- Successful', function (done) {
    api.get({
      url: '/affiliations/000000000000000000000001'

    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body._id).toBe('000000000000000000000001');
      expect(body.affiliation_description).toBe('affiliation about engineering');
      expect(body.full_name).toBe('engineering affiliation number 1');
      done();
    });
  });








});