var createError = require('http-errors');

var express = require('express');
var router = express.Router();

const User = require('../models/user');

//get users
router.get('/', function(req, res, next) {
  console.log("dsdada")
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.json(users)
  });
  console.log("gdggsgg")
});

//User registration (create user)
router.post('/', function(req, res, next) {
  console.log("dsdada")
  User.create( (err, users) => {
    if (err) return next(err);

    //if email field is empty
    if (req.body.email == null) {
      return next(createError(400, "Missing Email Field"));
    }
    //if full name field is empty
    if (req.body.first_name == null) {
      return next(createError(400, "Missing First Name Field"));
    }

    //if last name field is empty
    if (req.body.last_name == null) {
      return next(createError(400, "Missing Last Name Field"));
    }

    //if password field is empty
    if (req.body.password == null) {
      return next(createError(400, "Missing Password Field"));
    }

    //if username field is empty
    if (req.body.username == null) {
      return next(createError(400, "Missing Username Field"));
    } 

    //if affiliation name field is empty
    if (req.body.password == null) {
      return next(createError(400, "Missing Password Field"));
    }

    let createdUser = new User(req.body)
    createdUser.save((err, users) => {
      if (err) return next(err);

    res.json(users)
    });
  });
  console.log("gdggsgg")
});





module.exports = router;