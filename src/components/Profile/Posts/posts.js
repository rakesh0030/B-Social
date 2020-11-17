import {React,useEffect,useState} from 'react';

import Post from './Post/post';

import '../styles/Posts.css';

const Posts = (props)=>{
  // let postsArr = [
  //   {
  //     src : "https://images.unsplash.com/photo-1604403018948-d66de4f8c4e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1469826834904-e92950ee5bf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src :  "https://images.unsplash.com/photo-1562639410-3f9ff4e00b15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src :  "https://images.unsplash.com/photo-1556974068-bdbbf645c3f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1605165105518-bd8d3d1de465?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1605043948657-1606ebc1cf38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1604432043252-df89dd7ec397?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1590669983340-afd507b8d6d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1605194173943-9167005d9dfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
  //   },
  //   {
  //     src : "https://images.unsplash.com/photo-1522040883829-9104eee3488a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
  //   },
  // ];

  let postsArr = props.posts;

  console.log("postsArr is ",postsArr);

  const [postsMade,setPostMade] = useState([]);

    useEffect(()=>{
      setPostMade(postsArr);
    },[postsArr])

  console.log(postsMade);

  const PostsToShow = postsMade.map((post)=>{
    return <Post post={post}/>
  });

  console.log(PostsToShow);

  return (
    <div className="Posts">
      {
        PostsToShow
      }
    </div>
  )
}

export default Posts;