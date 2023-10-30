const router = require('express').Router();

const diagnosisMid = require('./diagnosis.controller');

router.post('/diagnoses', diagnosisMid.createDiagnosis);
router.get('/diagnoses/:appointmentId', diagnosisMid.readDiagnosis);
router.patch('/diagnoses/:appointmentId', diagnosisMid.updateDiagnosis);

module.exports = router;
