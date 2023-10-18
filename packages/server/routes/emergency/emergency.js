const router = require('express').Router();

const emergencyMid = require('./emergency.controller');

router.post('/emergencies', emergencyMid.createEmergency);

module.exports = router;
