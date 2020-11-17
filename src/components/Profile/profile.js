import {React,useEffect, useState} from 'react';
import axios from 'axios';
import M from 'materialize-css';
import './styles/Profile.css';

import Posts from './Posts/posts'; 

const Profile =()=>{
  const [posts,setPosts] = useState([]);
  const [userDetails,setUserDetails] = useState({});
  const [image,setImage] = useState("");
  const [imgURL,setImgURL] = useState(null); //For previewing img

  const uploadedImg = (event)=>{
   // console.log(event);
    setImage(event.target.files[0]);
    setImgURL(URL.createObjectURL(event.target.files[0]));
    //uploadProfilePic(event.target.files[0]);
  }

  useEffect(()=>{
    if(imgURL){
      const data = new FormData();
    console.log("image",image);
    data.append("file",image);
    data.append("upload_preset","b-social");
    data.append("cloud_name","dg56dpumj");
    axios.post("https://api.cloudinary.com/v1_1/dg56dpumj/image/upload",
      data
    )
    .then((r)=>{
      console.log(r);
      let options = {
        headers: {
          'Authorization':  localStorage.getItem("jwt")
        }
      }
      const newProfilePic = r.data.url
      console.log(options);
      let requestObj = {
        profilePic :newProfilePic
      };
      return axios.put("/user/profilePic",requestObj,options)
    })
    .then((r)=>{
      console.log(r);
      let newUserDetails = {...userDetails};
      console.log(newUserDetails);
      newUserDetails.profilePic = JSON.parse(r.config.data).profilePic;
      setUserDetails(newUserDetails);
      M.toast({html : `Profile Pic updated successfully.`,classes: "#2e7d32 green darken-3"});   
     })
    .catch((err)=>{
      console.log("Error is ",err);
      M.toast({html : `Error in updating profile pic ${err}`,classes: "#ff1744 red accent-3"})
    })
    }
  },[imgURL])


  


  useEffect(()=>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    axios.get('/posts/user-post',options)
      .then((r)=>{
        console.log(r);
        setPosts(r.data);
      })
      .catch((e)=>{
        console.log(e)
      })
  },[])

  useEffect(()=>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    axios.get("/user/userDetails",options)
      .then((r)=>{
        console.log(r.data)
        setUserDetails(r.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  },[])

  const editDescription = ()=>{
    /* TODO:
    Add description for the profile.
    */
  }


  return(
    <>
    <div className="profileTopSection">
    <div>
        <img src={userDetails.profilePic ? userDetails.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrD510r_Eg3OqeTcx-VnUxbD-VLVsH4JDPkQ&usqp=CAU"}
        className="profilePic"
        alt="Profile_Pic"
        ></img>
          <div className="file-field input-field col s12 center">
            <i class="material-icons">edit</i>
            <span style={{fontFamily:"sans-serif"}}>Edit Profile Pic</span>
            <input type="file"
              onChange={(e) => {console.log(e);uploadedImg(e)}}
            />
            <div className="file-path-wrapper" style={{display:'none'}}>
            <input className="file-path validate" type="text" />
          </div>
          </div>
      </div>
      <div className="profileDetails">
        <h5>
          {userDetails.name}
        </h5>
        <div className="userDetailSection">
          <h6>
          {userDetails.description ? userDetails.description : `${userDetails.name} has not added any description yet.`}
          </h6>
          <i class="material-icons" onClick={()=>editDescription()}>edit</i>
        </div>
        <div className="followSection">
          <h6><b>{posts.length}</b> posts</h6>
          <h6><b>{userDetails.followers ? userDetails.followers.length : 0}</b> followers</h6>
          <h6><b>{userDetails.following ? userDetails.following.length : 0}</b> following</h6>
        </div>
      </div>
    </div>
    <Posts posts={posts}/>
    </>
  );
}

export default Profile;