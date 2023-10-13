const router = require('express').Router();

const diagnosisMid = require('./diagnosis.controller');

router.post('/diagnosis', diagnosisMid.createDiagnosis);
router.patch('/diagnosis/:appointmentId', diagnosisMid.updateDiagnosis);

module.exports = router;
