const express = require('express');
const router = express.Router();

const { login } = require('./usuario.controller');


router.post('/', login);

module.exports = router;