const router = require('express').Router();

const hospitalMid = require('./hospital.controller');

router.get('/hospitals', hospitalMid.readHospitals);
router.get('/hospitals/:hospitalId/appointments', hospitalMid.readAppointments);
router.post('/hospitals', hospitalMid.createHospital);

module.exports = router;
