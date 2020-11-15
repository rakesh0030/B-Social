import {React,useState} from 'react';

import './styles/Home.css';

let favIconClasses = ["material-icons","favIcon"];



const Home =()=>{
  const [favIconClass,setFavIconClass] = useState(favIconClasses);


  const postLiked = ()=>{
    console.log(setFavIconClass);
    if(favIconClasses.includes('favIcon')){
      favIconClasses = ["material-icons","favIconLiked"];
      setFavIconClass(favIconClasses);
    }
    else{
      favIconClasses = ["material-icons","favIcon"];
      setFavIconClass(favIconClasses);
    }
  }
  
  return(
    <div className="Home">
      <div className="card home-card">
        <h5>User's Name</h5>
        <div className="card-image">
          <img 
          src="https://images.unsplash.com/photo-1604403018948-d66de4f8c4e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
          className="home-post-img"
          >
          </img>
        </div>
        <div className="card-content">
          <h6>Title</h6>
          <p>this is amazing post.</p>
          <input type="text" placeholder="Add a comment" className="input-field"></input>
        </div>
      </div>
      <div className="card home-card">
        <h5>User's Name</h5>
        <div className="card-image">
          <img 
          src="https://images.unsplash.com/photo-1575191832544-107450dd7ba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60"
          className="home-post-img"
          >
          </img>
        </div>
        <div className="card-content">
          <h6>Title</h6>
          <p>this is amazing post.</p>
          <i className={favIconClasses.join(" ")} onDoubleClick={postLiked}>favorite</i>
          <input type="text" placeholder="Add a comment" className="input-field"></input>
        </div>
      </div>
    </div>
  );
}

export default Home;