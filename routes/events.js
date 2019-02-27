var createError = require('http-errors');

var express = require('express');
var router = express.Router();

const Event = require('../models/event');
const User = require('../models/user');

//get events 
router.get('/', function(req, res, next) {
  console.log("dsdada")
  Event.find({}, (err, events) => {
    if (err) return next(err);
    res.json(events)
  });
  console.log("gdggsgg")
});

//Create a new event (authenicated users)
router.post('/', function(req, res, next) {
  console.log("dsdada")
  User.findOne({username:req.user.username}, (err, users) => {
    if (err) return next(err);

    if (users == null) {
      return next(createError(403, " Error: users not found"));
    }

    //if user is not admin
    // if (users.role_id != "000000000000000000000001") {
    //   return next(createError(403, "Authorization Error"));
    // }

    //if event description field is empty
    if (req.body.event_description == null) {
      return next(createError(400, "Missing Event Description Field"));
    }
    //if event location field is empty
    if (req.body.event_location == null) {
      return next(createError(400, "Missing Event Location Field"));
    }

    //if event name field is empty
    if (req.body.event_name == null) {
      return next(createError(400, "Missing Event Name Field"));
    }

    let createdEvent = new Event(req.body)
    createdEvent.save((err, events) => {
      if (err) return next(err);

    res.json(events)
    });
  });
  console.log("gdggsgg")
});


//approve reject and event
router.put('/:eventId/status/:Boolean', function(req, res, next) {
  User.findOne({username:req.user.username}, (err, users) => {
    if (err) return next(err);


        //if user is not admin
  if (users.role_id != "000000000000000000000001") {
    return next(createError(403, "Authorization Error"));
  }



Event.findById(req.params.eventId)
.exec((err, events) => {
  if (err) return next(err);

//params is from the url. Boolean has to match the url above
  if (req.params.Boolean == "true") {
    events.approved = true;
  } else {
    events.approved = false;
  }

  events.administrator_id = users;
  events.save();

 


   res.json(events)
});
});
});







//add an attendee to an event
router.put('/:eventId/:userId', function(req, res, next) {
  User.findOne({username:req.user.username}, (err, users) => {
    if (err) return next(err);

        //if user is not admin
  if (users.role_id != "000000000000000000000001") {
    return next(createError(403, "Authorization Error"));
  }


Event.findById(req.params.eventId).populate("attendance")
.exec((err, events) => {
  if (err) return next(err);

  User.findById(req.params.userId, (err, users) => {
    events.attendance.push(users);
    events.save();
 


   res.json(events.attendance)
  });
});
});
});





//get all attendees of an event 
router.get('/:eventId', function(req, res, next) {
    User.findOne({username:req.user.username}, (err, users) => {
      if (err) return next(err);

          //if user is not admin
    if (users.role_id != "000000000000000000000001") {
      return next(createError(403, "Authorization Error"));
    }


  Event.findById(req.params.eventId).populate("attendance")
  .exec((err, events) => {
    if (err) return next(err);

   

  
     res.json(events.attendance)
  });
});
});






module.exports = router;


// 	//Operation 8: Approve or Reject an Event
// 	//this will allow an administrator to approve an event 
// 	@RequestMapping(value = "/events/{id}/edit", method = RequestMethod.PUT)
// 	public Event approveEvent( @RequestBody Event event, @PathVariable Long id )
// 	{
// 		if(event.getAdministrators() != null) {
// 			if (approveEventHelper(event.getAdministrators().getRoles(), "admin") ) {
// 				event.setApproved(true);
// 			} else {
// 				throw new RestException( 409, "Event Not Approved. User Does Not Have Administrator Privilege" );
// 			}
// 		}
// 		return eventDao.approveEvent( event );
// 	}

// 	//approveEvent helper method
// 	public boolean approveEventHelper(Set<Role> roles, String rolename) {

// 		for(Role role : roles) {
// 			if (rolename.equals(role.getName()))
// 				return true;
// 		}
// 		return false; 
// 	}

// 	//Operation 9: Add an Attendee to an Event 
// 	@RequestMapping(value = "/events/{event_id}/users/{user_id}", method = RequestMethod.PUT)
// 	public Event addAttendee(@PathVariable Long event_id, @PathVariable Long user_id )
// 	{
// 		Event event = eventDao.getEvent(event_id);
// 		User user = userDao.getUser(user_id);
		
// 		List<User> eventAttendance = event.getAttendance();
// 		eventAttendance.add(user);
// 		event.setAttendance(eventAttendance);
		
// 		return eventDao.saveEvent(event);
// 	}

// 	//Operation 10: Get All Attendees of an Event
// 	@RequestMapping(value = "/events/{id}/users", method = RequestMethod.GET)
// 	public List<User> getAttendees( @PathVariable Long id )
// 	{
// 		Event event = eventDao.getEvent(id);
// 		return event.getAttendance();
// 	}
// }