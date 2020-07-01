var express = require('express');
const { notFound } = require('../controllers/errorController');
var router = express.Router();

router.route("*").all(notFound);

module.exports = router;