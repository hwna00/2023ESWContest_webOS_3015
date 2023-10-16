const router = require('express').Router();

const doctorMid = require('./doctor.controller');

router.post('/doctors', doctorMid.createDoctor);
router.get('/doctors', doctorMid.readDoctors);
router.get('/doctors/:doctorId', doctorMid.readDoctor);
router.get('/doctors/:doctorId/appointments', doctorMid.readDoctorAppointments);
router.get('/doctors/:doctorId/diagnoses', doctorMid.readDoctorDiagnoses);

module.exports = router;
