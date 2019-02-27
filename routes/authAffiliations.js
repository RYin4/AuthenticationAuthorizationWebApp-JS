var createError = require('http-errors');

var express = require('express');
var router = express.Router();

const Affiliation = require('../models/affiliation');
const User = require('../models/user');

router.get('/test', function(req, res, next) {
  console.log("dsdada")
  Affiliation.find({}, (err, affiliations) => {
    if (err) return next(err);
    res.json(affiliations)
  });
  console.log("gdggsgg")
});

//Create a new progam/affiliation (administrator only)
router.post('/', function(req, res, next) {
  console.log("dsdada")
  User.findOne({username:req.user.username}, (err, users) => {
    if (err) return next(err);

    if (users == null) {
      return next(createError(403, " Error: users not found"));
    }

    //if user is not admin
    if (users.role_id != "000000000000000000000001") {
      return next(createError(403, "Authorization Error"));
    }

    //if affiliation description field is empty
    if (req.body.affiliation_description == null) {
      return next(createError(400, "Missing Affiliation Description Field"));
    }
    //if full name field is empty
    if (req.body.full_name == null) {
      return next(createError(400, "Missing Full Name Field"));
    }

    //if affiliation name field is empty
    if (req.body.affiliation_name == null) {
      return next(createError(400, "Missing Affiliation Name Field"));
    }

    let createdAffiliation = new Affiliation(req.body)
    createdAffiliation.save((err, users) => {
      if (err) return next(err);

    res.json(users)
    });
  });
  console.log("gdggsgg")
});


//Edit a program/affiliation (administrator only). update using PUT
router.put('/:affiliationId', function(req, res, next) {
  Affiliation.findById(req.params.affiliationId, (err, affiliations) => {
    if (err) return next(err);
    affiliations.affiliation_description = req.body.affiliation_description;
    affiliations.affiliation_name = req.body.affiliation_name;
    affiliations.full_name = req.body.full_name;

    affiliations.save()
     res.json(affiliations)
    
  });
});







module.exports = router;