import {React,useState,useEffect,useRef,useContext} from 'react';
import axios from 'axios';
import {UserContext} from '../../App';
import M from 'materialize-css';
import Comment from './Comment/Comment';
import './styles/Home.css';
import { grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

let favIconClasses = ["material-icons","favIcon"];
let favIconLikedClasses = ["material-icons","favIconLiked"];



const Home =()=>{ 
  const {state,dispatch} = useContext(UserContext);
  const [favIconClass,setFavIconClass] = useState(favIconClasses);
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    axios.get("/posts/all-post",options)
      .then((r)=>{
        console.log("All posts are ",r);
        setPosts(r.data);
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])

  const postLiked = (postID,postAlreadyLiked)=>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if( !postAlreadyLiked ){
      axios.put('/posts/post-liked',{
        postID
      },options)
        .then((r)=>{
          console.log(r);
          console.log(setFavIconClass);
          M.toast({html : 'Post Liked', classes:"#2e7d32 green darken-3"});
        })
        .catch((err)=>{
          console.log(err);
          M.toast({html : 'Unable to like post at this time.', classes:"#ff1744 red accent-3"});
        })
    }
    else{
      axios.put('/posts/post-disliked',{
        postID
      },options)
        .then((r)=>{
          console.log(r);
          console.log(setFavIconClass);
          M.toast({html : 'Post Disliked', classes:"#2e7d32 green darken-3"});
        })
        .catch((err)=>{
          console.log(err);
          M.toast({html : 'Unable to dislike post at this time.', classes:"#ff1744 red accent-3"});
        })
    }

    //TODO : Later change this handling of posts to something else for now handling here itself
    let newPosts = posts.map((post)=>{
      if(postID == post._id){
        let idx = post.likes.indexOf(state._id);
        if(idx == -1){
          post.likes.push(state._id);
        }
        else{
          post.likes.splice(idx,1);
        }
      }
      return post;
    });
    setPosts(newPosts);
  }

  const addComment = (commentText,postID)=>{
    console.log(commentText);
    let commentMade = {
      authorName : state.name,
      authorID : state._id,
      content: commentText
    }
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    axios.put('/posts/post-comment',{
      commentMade,postID
    },options)
      .then((r)=>{
        console.log(r);
        console.log(setFavIconClass);
        M.toast({html : 'Comment Made', classes:"#2e7d32 green darken-3"});
      })
      .catch((err)=>{
        console.log(err);
        M.toast({html : 'Unable to comment on post at this time.', classes:"#ff1744 red accent-3"});
      })


    //TODO : Later change this handling of posts to something else for now handling here itself
    let newPosts = posts.map((post)=>{
      if(postID == post._id){
        post.comment.push(commentMade);
        console.log("post is ",post);
      }
      return post;
    });
    setPosts(newPosts);
  }

  // const loadOtherUserProfile = (authorID)=>{
   
  // }

  const deletePost = (postID) =>{
    let options = {
      headers: {
        'Authorization':  localStorage.getItem("jwt")
      }
    }
    axios.delete(`/posts/post/${postID}`,options)
      .then((r)=>{
        console.log(r)
        //TODO : Later change this handling of posts to something else for now handling here itself
        let idx;
        posts.forEach((post,postIdx) => {
          if (postID != post._id) {
            idx = postIdx;
          }
        });
        let newPosts = posts.slice(idx,1);
        M.toast({html:"Post Deleted successfully",classes:"#2e7d32 green darken-3"})
        setPosts(newPosts);
      })
      .catch((e)=>{
        console.log(e);
        M.toast({html : 'Unable to delete post.', classes:"#ff1744 red accent-3"});
      })
  }

  let postEle = <h3 style={{color:"gray",margin:"auto"}}>No Post Found</h3>;

  if(posts && posts){
    console.log(posts);
    postEle = posts.map((post)=>{
      return(
      <div className="card home-card" key={post._id}>
        <div className="postAuthorBlock">
          <Link className="otherUserProfileLink" to={post.authorID == state._id ? `/profile`  :`/profile/${post.authorID}`}>
            <h5>{post.authorName}</h5>
          </Link>
          {post.authorID == state._id ?
            <i class="material-icons deleteIcon" onClick={()=>deletePost(post._id)}>delete</i>
            : null
          }
        </div>
        <div className="card-image">
          <img 
          src={post.image}
          className="home-post-img"
          >
          </img>
        </div>
        <div className="card-content">
        <p>{post.postBody}</p>
        <i className={post.likes.includes(state._id) 
          ? favIconLikedClasses.join(" ") : favIconClasses.join(" ")
        } onDoubleClick={()=>postLiked(post._id,post.likes.includes(state._id) )}>favorite</i>
        <h6>{post.likes.length} Like</h6>
          <Comment comments={post.comment} 
          addComment={addComment} 
          postID={post._id} 
          />
        </div>
      </div>
      )
    })
  }
  
  return(
    <div className="Home">
      {postEle}
    </div>
  );
}

export default Home;