const mongodb = require('mongodb');
const {getDb} = require('../utils/database');

exports.getUserDetails = (req,res,next)=>{
  try {
    const db = getDb();
    let userID = req.user_id;
    if(req.params && req.params.userID){
      userID = req.params.userID;
    }
    db.collection('Users').findOne({_id : mongodb.ObjectID(userID)},{projection : {
      profilePic : 1, name : 1, description : 1, followers : 1, following : 1
    }})
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



exports.registerFollowReq = (req,res,next) => {
  try {
    const db = getDb();
    console.log("Request Object is ",req.body);
    db.collection('Users').updateOne({_id: mongodb.ObjectID(req.params.userToFollowID)},{
      '$push' : {'followers' : req.user_id}
    })
      .then((r) => {
        //res.status(200).send(r);
        return db.collection('Users').updateOne({_id: mongodb.ObjectID(req.user_id)},{
          '$push' : {'following' : req.params.userToFollowID}
        })
      })
      .then((r)=>{
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

exports.registerUnfollowReq = (req,res,next) => {
  try {
    const db = getDb();
    console.log("Request Object is ",req.body);
    db.collection('Users').updateOne({_id: mongodb.ObjectID(req.params.userToFollowID)},{
      '$pull' : {'followers' : req.user_id}
    })
      .then((r) => {
        //res.status(200).send(r);
        return db.collection('Users').updateOne({_id: mongodb.ObjectID(req.user_id)},{
          '$pull' : {'following' : req.params.userToFollowID}
        })
      })
      .then((r)=>{
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



exports.updateProfilePic = (req,res,next) => {
  try {
    const db = getDb();
    console.log("Request Object is ",req.body);
    db.collection('Users').updateOne({_id: mongodb.ObjectID(req.user_id)},{
      '$set' : {'profilePic' : req.body.profilePic}
    })
    .then((r)=>{
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