var createError = require('http-errors');

var express = require('express');
var router = express.Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');
const jwtSecret = 'hello';

router.post('/', (req, res, next) => {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) return next(err);


    if (user == null) {
      return next(createError(400, "Error: users not found"));
    }

    res.json({
      token: jwt.sign({
        username: user.username
      }, jwtSecret)
    });
  });
});

module.exports = router;