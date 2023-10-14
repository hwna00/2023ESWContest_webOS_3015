const router = require('express').Router();

const diagnosisMid = require('./diagnosis.controller');

router.post('/diagnoses', diagnosisMid.createDiagnosis);
router.patch('/diagnoses/:appointmentId', diagnosisMid.updateDiagnosis);

module.exports = router;
