
const {getDb} = require('../utils/database');
const mongodb = require('mongodb');

//Post structure
/*
  postBody = string
  authorID = _id
  authorName = string
  image = string(URI)
  comment = [{
    author = _id,
    text = string
  }]
  likes = [
    _id
  ]
  creationDate = date
*/


exports.createPost = (req,res,next) => {
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



