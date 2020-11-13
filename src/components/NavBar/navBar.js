import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavBar.css';

const navBar = ()=>{
  return (
  <nav className="NavBar">
    <div className="nav-wrapper black">
      <Link to="/" className="brand-logo left">
        <img src="/B-social.png" alt="B-Social" id="logo"></img>
        </Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/sign-up">Sign-up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/create-post">Create Post</Link></li>
      </ul>
    </div>
  </nav>
    )
}

export default navBar;