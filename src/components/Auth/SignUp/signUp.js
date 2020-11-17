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
  const [image,setImage] = useState("");
  const [imgURL,setImgURL] = useState(null); //For previewing img

  //TODO : Add email,name,password validator

  const signUpPostReq = async ()=>{
    let profilePic = null;
    if(image){
      //Add profile pic to cludinary
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "b-social");
      data.append("cloud_name", "dg56dpumj");
      const r = await axios.post("https://api.cloudinary.com/v1_1/dg56dpumj/image/upload",
        data
      )
      profilePic = r.data.url;
    }
    console.log("sign-up request made");
    const postData = {
      name,email,password,profilePic
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

  const uploadedImg = (event)=>{
    setImage(event.target.files[0]);
    setImgURL(URL.createObjectURL(event.target.files[0]));
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
        <div className="file-field input-field col s12">
          <div className="btn waves-effect waves-light #455a64 blue-grey darken-2">
            <span>Profile Pic</span>
            <input type="file" 
            onChange={(e)=>uploadedImg(e)}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
          <br></br>
          <div className="center">
            <img src={imgURL} alt="No image selected" id="previewImage"
            />
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