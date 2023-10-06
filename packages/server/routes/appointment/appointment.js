const router = require('express').Router();

const appointmentMid = require('./appointment.controller');

router.get('/appointments/:appointmentId', appointmentMid.readUserAppointment);
router.post('/appointments', appointmentMid.createAppointment);
router.patch('/appointments/:appointmentId', appointmentMid.updateAppointment);

module.exports = router;
