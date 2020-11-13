import React from 'react';
import './styles/createPost.css'

const CreatePost =()=>{
  return(
    <div className="CreatePostCard">
      <div class="card">
        <div class="card-content center">
          <span class="card-title">What's in your mind</span>
        </div>
        <div class="row">
          <div class="input-field col s12">
          <textarea id="post_body" class="materialize-textarea"></textarea>
          <label for="post_body">What's in your mind</label>
          </div>
        </div>
        <div class="file-field input-field col s12">
          <div class="btn">
            <span>File</span>
            <input type="file" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
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

export default CreatePost;