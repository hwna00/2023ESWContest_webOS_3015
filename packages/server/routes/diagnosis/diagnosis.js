const router = require('express').Router();

const diagnosisMid = require('./diagnosis.controller');

router.post('/diagnosis', diagnosisMid.createDiagnosis);

module.exports = router;
