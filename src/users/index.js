const express = require('express');
const router = express.Router();

const { create, addFollowers, deleteFollowing, deleteFollowers } = require('./user.controller');


router.post('/', create);
router.put('/', addFollowers);
router.put('/deleteFollowing/', deleteFollowing)
router.put('/deleteFollowers/', deleteFollowers)
module.exports = router;
