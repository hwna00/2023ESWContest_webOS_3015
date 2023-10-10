const router = require('express').Router();

const doctorMid = require('./doctor.controller');

router.post('/doctors', doctorMid.createDoctor);
router.get('/doctors/:doctorId', doctorMid.readDoctor);
router.get('/doctors/:doctorId/appointments', doctorMid.readDoctorAppointments);

module.exports = router;
