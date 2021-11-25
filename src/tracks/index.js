const express = require('express');
const router = express.Router();

const { get, create, deleteOne, update } = require('./controller')

router.get('/:input', get);
router.post('/', create);
router.put('/:_id', update);
router.delete('/:_id', deleteOne);

module.exports = router;