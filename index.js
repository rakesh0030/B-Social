const express = require('express');
const cors = require('cors');

const db = require('./utils/database');

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const userDetailsRoutes = require('./routes/user');


const app = express();

const middleware = (req,res,next)=>{

  console.log("Middleware running");
  next();
}

app.use(express.json());

app.use(cors())

app.use('/auth',authRoutes);
app.use('/posts/',postRoutes);
app.use('/user/',userDetailsRoutes);

app.get('/',middleware,(req,res,next)=>{
  res.send("Hello word");
  next();
})

const port = 8000;

db.monogoConnect((resp)=>{
  // console.log("Response is",resp);
  app.listen(port,()=>{
    console.log('server running on port ',port);
  })
})

