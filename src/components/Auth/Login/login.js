import {React,useState} from 'react';
import {useHistory} from 'react-router-dom';
import M from 'materialize-css';
import axios from 'axios';
import './styles/Login.css'

const Login =()=>{
  const history = useHistory();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const loginPostReq = ()=>{
    console.log("Login Request made");
    const postData = {
      email,password
    };
    axios.post('/auth/login',postData)
      .then((res)=>{
        M.toast({html: 'Login successful', classes:"#2e7d32 green darken-3"})
        // alert('Login successful');
        console.log('Response is',res);
        console.log(res.data.token);
        localStorage.setItem("jwt",res.data.token);
        history.push('/');
      })
      .catch((err)=>{
        M.toast({html: `Error in login ${err}`, classes:"#ff1744 red accent-3"})
        //alert('Error in login ',err);
      })
  }


  return(
    <div className="loginCard">
      <div className="card">
        <div className="card-content center">
          <span className="card-title">Welcome back</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            ></input>
            <label for="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            ></input>
            <label for="password">Password</label>
          </div>
        </div>
        <div className="card-action center">
          <button className="btn waves-effect waves-light #455a64 blue-grey darken-2" type="submit" name="action"
          onClick={()=>loginPostReq()}
          >Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;