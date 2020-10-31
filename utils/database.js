const mongodb = require('mongodb');

const constants = require('./constants');

const mongoClient = mongodb.MongoClient;

const monogoConnect = (callback) => {
  mongoClient.connect(constant.MONGOURI)
  .then((resp)=>{
    //console.log("Response",resp);
    console.log("Mongo DB Successfully connected!!");
    callback(resp);
  })
  .catch((err)=>{
    console.log("Error in connecting",err);
  })
}

module.exports = monogoConnect;