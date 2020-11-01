const express = require('express');

const db = require('./utils/database');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');


const app = express();

const middleware = (req,res,next)=>{

  console.log("Middleware running");
  next();
}

app.use(express.json());

app.use('/auth',authRoutes);
app.use('/posts/',postRoutes);

app.get('/',middleware,(req,res,next)=>{
  res.send("Hello word");
  next();
})

db.monogoConnect((resp)=>{
  // console.log("Response is",resp);
  app.listen('3000',()=>{
    console.log('server running');
  })
})

