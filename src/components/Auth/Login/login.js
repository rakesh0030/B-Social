import React from 'react';
import './styles/Login.css'

const login =()=>{
  return(
    <div className="loginCard">
      <div class="card">
        <div class="card-content center">
          <span class="card-title">Welcome back</span>
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
          <button class="btn waves-effect waves-light #455a64 blue-grey darken-2" type="submit" name="action">Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default login;