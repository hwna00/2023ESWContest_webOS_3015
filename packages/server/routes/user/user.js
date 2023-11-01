const router = require('express').Router();

const userMid = require('./user.controller');

router.post('/users', userMid.createUser);
router.post('/users/:uid/side-effects', userMid.createUserSideEffects);
router.get('/users/:uid', userMid.readUser);
router.get('/users/:uid/appointments', userMid.readUserAppointments);
router.get('/users/:uid/diagnoses', userMid.readUserDiagnoses);
router.get('/users/:uid/medecines', userMid.readUserMedecines);
router.get('/users/:uid/vital-signs', userMid.readUserVitalSigns);
router.get('/users/:uid/recent-vital-signs', userMid.readUserRecentVitalSigns);
router.get('/users/:uid/favorites', userMid.readUserFavorites);
router.get('/users/:uid/side-effects', userMid.readUserSideEffects);
router.patch('/users/:uid', userMid.updateUser);

module.exports = router;
