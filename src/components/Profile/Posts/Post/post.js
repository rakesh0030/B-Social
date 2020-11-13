import React from 'react';

import '../../styles/Post.css';

const Post = (props)=>{
  console.log("props",props);
  return(
  <img src={props.post.src} alt="img" className="Post"/>
  );
}

export default Post;