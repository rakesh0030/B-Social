/*
TODO: Later will make profile and profileOfOtherUser a common component.
*/

import {React,useEffect, useState,useContext} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import M from 'materialize-css';
import './styles/Profile.css';
import {UserContext} from '../../App';

import Posts from './Posts/posts'; 

const ProfileOfOtherUser =()=>{
  const [posts,setPosts] = useState([]);
  const [userDetails,setUserDetails] = useState({});
  const {state,dispatch} = useContext(UserContext);
  const {authorID} = useParams();
  useEffect(()=>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    axios.get("/posts/user-post/"+authorID,options)
      .then((r)=>{
        console.log(r.data)
        setPosts(r.data)
      })
      .catch((e)=>{
        console.log(e);
      })
  },[])

  useEffect(()=>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    axios.get("/user/userDetails/"+authorID,options)
      .then((r)=>{
        console.log(r.data)
        setUserDetails(r.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  },[])

  const followReq = ()=>{
    if(userDetails.followers && userDetails.followers.includes(state._id)){
      //Send a unfollow request
       let options = {
        headers: {
          'Authorization':  localStorage.getItem("jwt")
        }
      }
      axios.put("/user/unfollow/"+authorID,{},options)
        .then((r)=>{
          console.log(r.data)
          M.toast({html:`Stopped Following ${userDetails.name}`,classes:"#2e7d32 green darken-3"})
          let newUserDetails = {...userDetails};
          let idx = userDetails.followers.indexOf(state._id);
          if(userDetails.followers.length == 1){
            newUserDetails.followers = [];
          }
          else{
            newUserDetails.followers = userDetails.followers.slice(idx,1); 
          }
          console.log("new user details ",newUserDetails);
          setUserDetails(newUserDetails)
        })
        .catch((e)=>{
          M.toast({html : `Unable to unfollow ${userDetails.name} at this time.`, classes:"#ff1744 red accent-3"});
          console.log(e);
        })
    }
    else{
      //Send a follow request
      let options = {
        headers: {
          'Authorization':  localStorage.getItem("jwt")
        }
      }
      axios.put("/user/follow/"+authorID,{},options)
        .then((r)=>{
          console.log(r.data)
          M.toast({html:`Started Following ${userDetails.name}`,classes:"#2e7d32 green darken-3"})
          let newUserDetails = {...userDetails};
          if(userDetails.followers){
            newUserDetails.followers = [...userDetails.followers,state._id];
          }
          else{
            newUserDetails.followers = [state._id];
          }
          setUserDetails(newUserDetails)
        })
        .catch((e)=>{
          M.toast({html : `Unable to follow ${userDetails.name} at this time.`, classes:"#ff1744 red accent-3"});
          console.log(e);
        })
    }
  }


  return(
    <>
    <div className="profileTopSection">
      <div>
        <img src={userDetails.profilePic ? userDetails.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrD510r_Eg3OqeTcx-VnUxbD-VLVsH4JDPkQ&usqp=CAU"}
        className="profilePic"
        alt="Profile_Pic"
        ></img>
      </div>
      <div className="profileDetails">
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <h5>
          {userDetails.name}
        </h5>
        <button className="btn-small waves-effect waves-light #455a64 blue-grey darken-2" type="submit" name="action" style={{alignSelf:"center"}}
          onClick = {()=>followReq()}
          >{userDetails.followers ? (userDetails.followers.includes(state._id) ? "Following" : "Follow") : "Follow"}
          </button>
        </div>
        <div className="userDetailSection">
        <h6>
        {userDetails.description ? userDetails.description : `${userDetails.name} has not added any description yet.`}
        </h6>
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

export default ProfileOfOtherUser;