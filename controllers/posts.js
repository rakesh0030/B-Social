
const {getDb} = require('../utils/database');
const mongodb = require('mongodb');
const { response } = require('express');

//Post structure
/*
  postBody = string
  authorID = _id
  authorName = string
  image = string(URI)
  comment = [{
    authorID = _id,
    authorName = string,
    content = string
  }]
  likes = [
    _id
  ]
  creationDate = date
*/


exports.createPost = (req,res,next) => {
  console.log("create post called");
  try {
    const { postBody,image,creationDate} = req.body;
    const userID = req.user_id;

    if( !postBody || !creationDate)
    throw {
      message: "Require body,author and creation-date for creating the post.",
      status: 422
    };
    const db = getDb();
    db.collection('Users').findOne({_id : mongodb.ObjectId(userID)})
      .then((user)=>{
        if(!user)
        throw {
          message: "User doesn't exists.",
          status: 400
        };
        return user.name;
      })
      .then((userName)=>{
        return db.collection('Posts').insertOne({
          authorID : userID,
          postBody,
          image,
          creationDate ,// TODO : Have to check it later how to store date,
          comment : [],
          likes : [],
          authorName : userName
        })
      })
      .then((r)=>{
        res.status(200).send("Post crated successfully");
      })
      .catch((err)=>{
        console.log(err);
        res.status(err.message).send(err.status);
      })
    
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}

exports.deletePost = (req,res,next) => {
  try {
    const postID = req.params.postID;
    const userID = req.user_id;


    const db = getDb();
    db.collection('Posts').findOne({_id : mongodb.ObjectId(postID)})
      .then((post)=>{
        if(!post)
        throw {
          message: "Post doesn't exists.",
          status: 400
        };
        //Checking if the post is made by the user attempting to delete
        const postByUser = post.authorID;
        if(postByUser != userID)
        throw {
          message: "Post doesn't belong to user( " + post.authorName + " ).",
          status: 403
        };
        return post;
      })
      .then((post)=>{
        return db.collection('Posts').remove({
          _id : mongodb.ObjectId(postID)
        },1)
      })
      .then((r)=>{
        res.status(200).send("Post deleted successfully");
      })
      .catch((err)=>{
        console.log(err);
        res.status(err.message).send(err.status);
      })
    
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}

exports.loadAllPosts = (req,res,next) => {
  try {
    const db = getDb();
    db.collection('Posts').find({}).toArray()
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}


exports.loadUserPosts = (req,res,next) => {
  try {
    const db = getDb();
    db.collection('Posts').find({authorID : req.user_id},{projection : {
      authorID : 0
    }}).toArray()
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}

exports.loadOtherUserPosts = (req,res,next) => {
  try {
    const db = getDb();
    console.log(req.params.userID);
    db.collection('Posts').find({authorID : req.params.userID},{projection : {
      authorID : 0
    }}).toArray()
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}



exports.registerLikeForPost = (req,res,next) => {
  try {
    const db = getDb();
    console.log("Request Object is ",req.body);
    db.collection('Posts').updateOne({_id: mongodb.ObjectID(req.body.postID)},{
      '$push' : {'likes' : req.user_id}
    })
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}



exports.registerDislikeForPost = (req,res,next) => {
  try {
    const db = getDb();
    console.log("Request Object is ",req.body);
    db.collection('Posts').updateOne({_id: mongodb.ObjectID(req.body.postID)},{
      '$pull' : {'likes' : req.user_id}
    })
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}



exports.registerCommentForPost = (req,res,next) => {
  try {
    const db = getDb();
    console.log("Request Object is ",req.body);
    db.collection('Posts').updateOne({_id: mongodb.ObjectID(req.body.postID)},{
      '$push' : {'comment' : req.body.commentMade}
    })
      .then((r) => {
        res.status(200).send(r);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      })
  }
  catch (err) {
    console.log(err);
    res.status(err.message).send(err.status);
  }
}



