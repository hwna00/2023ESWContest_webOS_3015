const router = require('express').Router();

const medicineMid = require('./medicine.controller');

router.post('/medicines', medicineMid.createMedicine);

module.exports = router;
