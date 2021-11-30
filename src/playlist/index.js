const express = require('express');
const router = express.Router();

const {get, create, update, deleteOne, addTrack, deleteTrack} = require('./controller');

router.get('/:input', get);
router.post('/', create);
router.put('/', update);
router.put('/addtrack/:_id', addTrack);
router.put('/deletetrack/:_id', deleteTrack)
router.delete('/', deleteOne);

module.exports = router;
