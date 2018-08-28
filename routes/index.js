var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/drugs', db.getAllDrugs);

/*
router.get('/api/puppies/:id', db.getSinglePuppy);
router.post('/api/puppies', db.createPuppy);
router.put('/api/puppies/:id', db.updatePuppy);
router.delete('/api/puppies/:id', db.removePuppy);
*/

module.exports = router;
