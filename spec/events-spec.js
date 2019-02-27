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

  //Get all Attendees - Success
  it('Get all attendees - Successful', function (done) {
    api.get({
      url: '/events/000000000000000000000001',
      headers: {
        'Authorization': 'Bearer ' + jwtTokenAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.length).toBe(2);
      done();
    });
  });

  //Add an Attendee - Success
  it('Add an Attendee - Successful', function (done) {
    api.put({
      url: '/events/000000000000000000000002/000000000000000000000001',
      headers: {
        'Authorization': 'Bearer ' + jwtTokenAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.length).toBe(1);
      done();
    });
  });

  //Approve / Reject an event - success
  it('Approve Reject an Event - Successful', function (done) {
    api.put({
      url: '/events/000000000000000000000001/status/true',
      headers: {
        'Authorization': 'Bearer ' + jwtTokenAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.approved).toBe(true);
      done();
    });
  });

  //Approve / Reject an event - Fail because not admin
  it('Approve Reject an Event - Fail', function (done) {
    api.put({
      url: '/events/000000000000000000000001/status/true',
      headers: {
        'Authorization': 'Bearer ' + jwtTokenNotAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(403);
      expect(body.msg).toBe("Authorization Error");
      done();
    });
  });

  //Approve / Reject an event - fail because not a registered user 
  it('Approve Reject an Event - Fail', function (done) {
    api.put({
      url: '/events/000000000000000000000001/status/true'

    }, function (err, res, body) {
      expect(res.statusCode).toBe(401);
      expect(body.msg).toBe("Unauthorized");
      done();
    });
  });

  //Create a new event - success
  it('Create a New Event - Successful', function (done) {
    api.post({
      url: '/events',
      body: {

        event_description: "Tenth Event in the events table",
        event_location: "Mexico",
        event_name: "Tenth Event",
        administrator_id: "000000000000000000000001",
        organizer_id: "000000000000000000000001"

      },
      headers: {
        'Authorization': 'Bearer ' + jwtTokenNotAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(res.body.event_description).toBe("Tenth Event in the events table");
      expect(res.body.event_location).toBe("Mexico");
      expect(res.body.event_name).toBe("Tenth Event");
      expect(res.body.administrator_id).toBe("000000000000000000000001");
      expect(res.body.organizer_id).toBe("000000000000000000000001");
      done();
    });
  });

  //create a new event - fail because missing a required field 
  it('Create a New Event - Fail', function (done) {
    api.post({
      url: '/events',
      body: {

        event_description: "Tenth Event in the events table",
        event_location: "Mexico",

        administrator_id: "000000000000000000000001",
        organizer_id: "000000000000000000000001"

      },
      headers: {
        'Authorization': 'Bearer ' + jwtTokenNotAdmin
      }
    }, function (err, res, body) {
      expect(res.statusCode).toBe(400);
      expect(res.body.msg).toBe("Missing Event Name Field");
      done();
    });
  });










});