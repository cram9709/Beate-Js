const express = require('express');
const router = express.Router();

const { create } = require('./usuario.controller');


router.post('/', create);

module.exports = router;