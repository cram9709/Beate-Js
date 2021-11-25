const express = require('express');
const router = express.Router();

const {get, create, update, deleteOne} = require('./controller');

router.get('/', get);
router.post('/', create);
router.put('/', update);
router.delete('/', deleteOne);

module.exports = router;
