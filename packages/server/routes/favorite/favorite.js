const router = require('express').Router();

const favoriteMid = require('./favorite.controller');

router.post('/favorites', favoriteMid.createFavorite);

module.exports = router;
