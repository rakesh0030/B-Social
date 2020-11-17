import './App.css';
import {React,useEffect,createContext,useContext} from 'react';
import NavBar from './components/NavBar/navBar';
import {BrowserRouter, Route, Switch,useHistory} from 'react-router-dom';
import Home from './components/Home/home';
import Profile from './components/Profile/profile';
import ProfileOfOtherUser from './components/Profile/profileOfOtherUser';
import Login from './components/Auth/Login/login';
import SignUp from './components/Auth/SignUp/signUp';
import CreatePost from './components/CreatePost/createPost';
import {initialState,reducer} from './reducers/userReducer';
import {AppBar, Card, Typography,TextField,CardContent,CardHeader, Button} from '@material-ui/core';
import { useReducer } from 'react';


export const UserContext = createContext();

const Routing = ()=>{
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      /*
        Setting dispatch here, so that our state is maintained even if we close the
        browser/tab.
      */
      dispatch({type:"USER",payload:user});
      history.push('/');
    }
    else{
      history.push('/login');
    }
  },[]);
  return(
    <div className="App">
      <Switch>
        <Route path='/profile' exact component={Profile}></Route>
        <Route path='/profile/:authorID' exact component={ProfileOfOtherUser}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/sign-up' component={SignUp}></Route>
        <Route path='/create-post' component={CreatePost}></Route>
        <Route path='/' component={Home}></Route>
      </Switch>
    </div>
  );
}


function App() {

  /*
  Here dispatch will be used to update my central state. 
  */
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    /*
    Using UserContext here make state and dispatch available in all children components.
    */
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;


/*
    <>
    <AppBar position="fixed" className="NavBar">
      <a href="/" id="logoTypoGraphy">
      <Typography variant="h3" >
        <img src="/B-social.png" alt="B-Social" id="logo"></img>
      </Typography>
      </a>
    </AppBar>
    <Card className="SignInCard">
      <CardHeader title="Sign Up" subheader="to continue to b-social" align="center" className="CardHeader"/>
      <CardContent>
        <form>
          <TextField id="emailID" label="email-id" variant="outlined" className="TextField"/>
          <TextField id="password" label="password" variant="outlined" type="password" className="TextField"/>
          <Button >Sign Up</Button>
        </form>
      </CardContent>
    </Card>
    </>
    */
  
