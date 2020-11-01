const express = require('express');

const router = express.Router();

const postsController = require('../controllers/posts');

const requireLogin = require('../middlewares/requireLogin');

router.post('/post',requireLogin,postsController.createPost);

router.delete('/post/:postID',requireLogin,postsController.deletePost);


module.exports = router;