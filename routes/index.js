var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/drugs', db.getAllDrugs);

router.get('/genes', db.getGenes);

router.get('/contexts', db.getContexts);

router.get('/genes/:gene', db.getGene);

router.get('/genes/:gene/treatments', db.getTreatments);

module.exports = router;
