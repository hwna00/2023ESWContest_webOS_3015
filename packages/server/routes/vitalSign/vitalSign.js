const router = require('express').Router();

const vitalSignMid = require('./vitalSign.controller');

router.post('/vital-signs', vitalSignMid.createVitalSign);

module.exports = router;
