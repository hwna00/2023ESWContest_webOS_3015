const router = require('express').Router();

const counselorMid = require('./counselor.controller');

router.post('/counselors', counselorMid.createCounselor);
router.get('/counselors/:counselorId', counselorMid.readCounselor);

module.exports = router;
