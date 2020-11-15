import {React,useState} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';
import './styles/SignUp.css';

const SignUp =()=>{
  const history = useHistory();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  //TODO : Add email,name,password validator

  const signUpPostReq = ()=>{
    console.log("sign-up request made");
    const postData = {
      name,email,password
    };
    axios.post('/auth/signup',postData)
      .then((res)=>{
        M.toast({html: 'Sign-up successful', classes:"#2e7d32 green darken-3"})
        history.push('/login');
        //alert('Sign-up successful');
      })
      .catch((err)=>{
        M.toast({html: `Error in sign up ${err}`, classes:"#ff1744 red accent-3"})
       // alert('Error in sign-up ',err);
      })
  }

  return(
    <div className="SignUpCard">
      <div className="card">
        <div className="card-content center">
          <span className="card-title">Welcome</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="name" type="text" className="validate" value={name}
            onChange = {(e)=>setName(e.target.value)}
            ></input>
            <label for="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" value={email}
            onChange = {(e)=>setEmail(e.target.value)}
            ></input>
            <label for="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" value={password}
            onChange = {(e)=>setPassword(e.target.value)}
            ></input>
            <label for="password">Password</label>
          </div>
        </div>
        <div className="card-action center">
          <button className="btn waves-effect waves-light #455a64 blue-grey darken-2" type="submit" name="action"
          onClick = {()=>signUpPostReq()}
          >Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;