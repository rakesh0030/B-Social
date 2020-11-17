const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts');

const requireLogin = require('../middlewares/requireLogin');

router.post('/create-post',requireLogin,postsController.createPost);

router.get('/user-post',requireLogin,postsController.loadUserPosts);

router.get('/user-post/:userID',requireLogin,postsController.loadOtherUserPosts);

router.get('/all-post',requireLogin,postsController.loadAllPosts);

router.delete('/post/:postID',requireLogin,postsController.deletePost);

router.put('/post-liked',requireLogin,postsController.registerLikeForPost);

router.put('/post-disliked',requireLogin,postsController.registerDislikeForPost);

router.put('/post-comment',requireLogin,postsController.registerCommentForPost);


module.exports = router;