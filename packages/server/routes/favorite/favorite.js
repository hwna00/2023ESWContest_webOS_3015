const router = require('express').Router();

const favoriteMid = require('./favorite.controller');

router.post('/favorites', favoriteMid.createFavorite);
router.delete('/favorites', favoriteMid.deleteFavorite);

module.exports = router;
