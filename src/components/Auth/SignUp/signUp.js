import React from 'react';
import './styles/SignUp.css'

const signUp =()=>{
  return(
    <div className="SignUpCard">
      <div class="card">
        <div class="card-content center">
          <span class="card-title">Welcome</span>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="name" type="text" class="validate"></input>
            <label for="name">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate"></input>
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate"></input>
            <label for="password">Password</label>
          </div>
        </div>
        <div class="card-action center">
          <button class="btn waves-effect waves-light #455a64 blue-grey darken-2" type="submit" name="action">Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default signUp;