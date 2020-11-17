import {React,useContext} from 'react';
import M from 'materialize-css';
import { Link ,useHistory} from 'react-router-dom';
import './styles/NavBar.css';
import {UserContext} from '../../App';

const NavBar = ()=>{
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();

  let navLinksToBeDisplayed = [];
  if(state){
    navLinksToBeDisplayed = [
      <li key="profile"><Link to="/profile">Profile</Link></li>,
      <li key="create-post"><Link to="/create-post">Create Post</Link></li>,
      <li key="logout">
        <button className="btn waves-effect waves-light #455a64 blue-grey darken-2" name="action"
          onClick = {()=>
          {
            console.log("clicked");
            localStorage.clear();
            dispatch({type:"CLEAR"});
            history.push('/login');
            console.log("State is ",state);
           // window.location.reload();
          }}
          >Log Out
          </button>
      </li>
    ]
  }
  else{
    navLinksToBeDisplayed = [
      <li key="login"><Link to="/login">Login</Link></li>,
      <li key="sign-up"><Link to="/sign-up">Sign-up</Link></li>
    ]
  }

  const displayToastWhenNotLoggedIn = ()=>{
    if(!state){
      M.toast({html:`Please Login first`,classes:"#ff1744 red accent-3"})
    }
  }

  return (
  <nav className="NavBar">
    <div className="nav-wrapper black">
      <Link to={state ? "/" : "/login"} className="brand-logo left">
        <img src="/B-social.png" alt="B-Social" id="logo" onClick={()=>displayToastWhenNotLoggedIn()}></img>
        </Link>
      <ul id="nav-mobile" className="right">
        {navLinksToBeDisplayed}
      </ul>
    </div>
  </nav>
    )
}

export default NavBar;