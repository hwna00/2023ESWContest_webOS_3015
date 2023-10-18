const router = require('express').Router();

const counselorMid = require('./counselor.controller');

router.post('/counselors', counselorMid.createCounselor);
router.get('/counselors/:counselorId', counselorMid.readCounselor);
router.get(
  '/counselors/:counselorId/emergencies',
  counselorMid.readCounselorEmergencies,
);

module.exports = router;
