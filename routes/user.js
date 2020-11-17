const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

const requireLogin = require('../middlewares/requireLogin');

router.get('/userDetails(/:userID)?',requireLogin,userController.getUserDetails);

router.put('/follow/:userToFollowID',requireLogin,userController.registerFollowReq);

router.put('/unfollow/:userToFollowID',requireLogin,userController.registerUnfollowReq);

router.put('/profilePic',requireLogin,userController.updateProfilePic);

module.exports = router;