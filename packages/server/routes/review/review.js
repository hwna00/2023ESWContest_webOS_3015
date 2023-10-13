const router = require('express').Router();

const reviewMid = require('./review.controller');

router.post('/reviews', reviewMid.createReview);

module.exports = router;
