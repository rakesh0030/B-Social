import React, { useState } from 'react';
import '../styles/Comment.css';

const Comment = (props) => {
    const [addCommentText,setAddCommentText] = useState("");

    let commentsEle = [];
    commentsEle = props.comments.map((comment)=>{
      return(
      <>
      <h6>{comment.authorName}</h6>
      <p>{comment.content}</p>
      </>
      );
    })
    console.log(commentsEle);
    console.log(props);
    return(
      <>
      <div className="addCommentBlock">
      <textarea placeholder="Add a comment" className="materialize-textarea"
           value={addCommentText}
           onChange={(e)=>setAddCommentText(e.target.value)}
          ></textarea>
      <button className="btn-small waves-effect waves-light #455a64 blue-grey darken-2" type="submit" name="action"
        onClick={()=>props.addComment(addCommentText,props.postID)}
          >Comment
          </button>
        </div>
      {commentsEle}
      </>
    )
}

export default Comment;