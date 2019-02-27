var express = require('express');
var router = express.Router();

const Affiliation = require('../models/affiliation');

//get all program/affiliations 
router.get('/', function(req, res, next) {
  Affiliation.find( (err, affiliations) => {
    if (err) return next(err);
     res.json(affiliations)
  });
});

//get a program/affiliation by id
router.get('/:affiliationId', function(req, res, next) {
  Affiliation.findById(req.params.affiliationId, (err, affiliations) => {
    if (err) return next(err);
     res.json(affiliations)
  });
});

module.exports = router;