const express = require('express');
const router = express.Router();

const { create } = require('./controller');


router.post('/', create);

module.exports = router;