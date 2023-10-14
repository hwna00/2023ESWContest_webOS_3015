const router = require('express').Router();

const appointmentMid = require('./appointment.controller');

router.get('/appointments/:appointmentId', appointmentMid.readAppointment);
router.post('/appointments', appointmentMid.createAppointment);
router.patch('/appointments/:appointmentId', appointmentMid.updateAppointment);
router.delete('/appointments/:appointmentId', appointmentMid.deleteAppointment);

module.exports = router;
