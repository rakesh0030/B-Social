import React from 'react';
import './styles/Profile.css';

import Posts from './Posts/posts'; 

const profile =()=>{
  return(
    <>
    <div className="profileTopSection">
      <div>
        <img src="https://images.unsplash.com/photo-1485528562718-2ae1c8419ae2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
        className="profilePic"
        alt="Profile_Pic"
        ></img>
      </div>
      <div className="profileDetails">
        <h5>
          User's Name
        </h5>
        <div className="userDetailSection">
        <h6>
         I m a pasionate full-stack web developer. I build websites from scratch using tech stack like Node js, React Js, Mongo DB, Go. Contact me on below number. 9784488384
        </h6>
        </div>
        <div className="followSection">
          <h6><b>3</b> posts</h6>
          <h6><b>10</b> followsers</h6>
          <h6><b>100</b> following</h6>
        </div>
      </div>
    </div>
    <Posts/>
    </>
  );
}

export default profile;