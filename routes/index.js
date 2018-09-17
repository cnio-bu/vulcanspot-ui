var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/drugs', db.getAllDrugs);

router.get('/genes', db.getAllGenes);

router.get('/genes/:gene', db.getGene);

router.get('/genes/:gene/therapies', db.getTherapies);

module.exports = router;
