const router = require('express').Router();

const emergencyMid = require('./emergency.controller');

router.post('/emergencies', emergencyMid.createEmergency);
router.get('/emergencies/:emergencyId', emergencyMid.readEmergency);
router.patch('/emergencies/:emergencyId', emergencyMid.updateEmergency);

module.exports = router;
