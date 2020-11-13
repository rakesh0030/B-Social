import './App.css';
import NavBar from './components/NavBar/navBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home/home';
import Profile from './components/Profile/profile';
import Login from './components/Auth/Login/login';
import SignUp from './components/Auth/SignUp/signUp';
import CreatePost from './components/CreatePost/createPost';
import {AppBar, Card, Typography,TextField,CardContent,CardHeader, Button} from '@material-ui/core';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="App">
          <Switch>
            <Route path='/profile' component={Profile}></Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/sign-up' component={SignUp}></Route>
            <Route path='/create-post' component={CreatePost}></Route>
            <Route path='/' component={Home}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
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
  
