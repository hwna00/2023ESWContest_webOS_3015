const router = require('express').Router();

const userMid = require('./user.controller');

router.get('/users/:uid', userMid.readUser);
router.post('/users', userMid.createUser);
router.patch('/users/:uid', userMid.updateUser);

module.exports = router;
