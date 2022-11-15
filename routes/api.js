const express = require('express');
const {translateText} = require('../controllers/api');

const router = express.Router();

router.route('/translate').post(translateText);

module.exports = router;