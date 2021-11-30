const express = require('express');
const router = express.Router();

const { getOne, create, deleteOne, update, addTrack, deleteTrack } = require('./controller')

router.get('/:name', getOne);
router.post('/', create);
router.put('/:_id', update);
router.put('/addtrack/:_id', addTrack);
router.put('/deletetrack/:_id', deleteTrack);
router.delete('/:_id', deleteOne);

module.exports = router;