import {React,useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import './styles/createPost.css'

const CreatePost =()=>{
  const [postBody,setPostBody] = useState("");
  const [image,setImage] = useState("");
  const [imgURL,setImgURL] = useState(null); //For previewing img
  const history = useHistory();

  const uploadedImg = (event)=>{
    setImage(event.target.files[0]);
    setImgURL(URL.createObjectURL(event.target.files[0]));
  }

  const uploadPost = ()=>{
    const data = new FormData();
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
      console.log(options);
      let requestObj = {
        postBody,
        image :r.data.url,
        creationDate : '15/11/2020'
      };
      return axios.post("/posts/create-post",requestObj,options)
    })
    .then((r)=>{
      M.toast({html : `Post created successfully.`,classes: "#2e7d32 green darken-3"});
      history.push('/');
    })
    .catch((err)=>{
      console.log("Error is ",err);
      M.toast({html : `Error in creating post ${err}`,classes: "#ff1744 red accent-3"})
    })
  }

  return(
    <div className="CreatePostCard">
      <div className="card">
        <div className="card-content center">
          <span className="card-title">What's in your mind</span>
        </div>
        <div className="row">
          <div className="input-field col s12">
          <textarea id="post_body" className="materialize-textarea"
          value={postBody}
          onChange={(e)=>setPostBody(e.target.value)}
          ></textarea>
          <label for="post_body">Post...</label>
          </div>
        </div>
        <div className="file-field input-field col s12">
          <div className="btn waves-effect waves-light #455a64 blue-grey darken-2">
            <span>Image</span>
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
          onClick={()=>uploadPost()}
          >Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;