const express = require('express');
const router = express.Router();

const { create, addFollowers, deleteFollowing, deleteFollowers, update, getUsername, getName } = require('./controller');

router.get('/:input', getUsername);
router.get('/:input', getName);
router.post('/', create);
router.put('/', update);
router.put('/follow', addFollowers);
router.put('/deleteFollowing/', deleteFollowing);
router.put('/deleteFollowers/', deleteFollowers);
module.exports = router;
