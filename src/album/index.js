const express = require('express');
const router = express.Router();

const { getOne, create, deleteOne, update } = require('./controller')

router.get('/:name', getOne);
router.post('/', create);
router.put('/:_id', update);
router.delete('/:_id', deleteOne);

module.exports = router;