const express = require('express');
const {translateText} = require('../controllers/api');
const cache = require('../middleware/cache');

const router = express.Router();

router.route('/translate').post(cache, translateText);

module.exports = router;