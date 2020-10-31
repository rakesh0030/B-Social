const express = require('express');

const mongoConnect = require('./utils/database');


const app = express();

const middleware = (req,res,next)=>{

  console.log("Middleware running");
  next();
}

app.get('/',middleware,(req,res,next)=>{
  res.send("Hello word");
  next();
})

mongoConnect((resp)=>{
  // console.log("Response is",resp);
  app.listen('3000',()=>{
    console.log('server running');
  })
})

