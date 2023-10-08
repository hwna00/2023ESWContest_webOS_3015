const router = require('express').Router();

const doctorMid = require('./doctor.controller');

router.post('/doctors', doctorMid.createDoctor);

module.exports = router;
