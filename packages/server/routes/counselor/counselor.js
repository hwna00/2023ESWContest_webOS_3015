const router = require('express').Router();

const counselorMid = require('./counselor.controller');

router.post('/counselors', counselorMid.createCounselor);

module.exports = router;
