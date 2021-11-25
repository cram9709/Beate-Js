const express = require('express');
const router = express.Router();

const { getAll, getOne, create, update } = require('./profile.controller');

router.get('/', getAll);
router.get('/:_id', getOne);
router.post('/', create);
router.put('/:_id', update);

module.exports = router;