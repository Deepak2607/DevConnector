import React, {Fragment, useEffect} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';

const App= ()=> {
    
    
    //this useEffect function runs every time when app is reloaded (or moving to some..login/register via url)
    //when app is reloaded, all states change to default values (you can also see in previous react apps..that all the data stored in the state is lost when reloaded)
    //for example-- when a user is logged in and site is reloaded, the user (and isAuthenticated) are set to default(null).
    //this function also runs in parallel when site is reloaded, here it is used to extract information of logged in user. so in this way, this function sets the state according to logged in/logged out user.
    
    
    useEffect(() => {
        store.dispatch(loadUser());
      }, []);
    
  return (
      
    <Provider store={store}>
    <BrowserRouter>
     
      <Navbar/>
      <Route exact path="/" component={Landing} />
      <div className="container">
      <Alert/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      </div>
 
    </BrowserRouter>
    </Provider>
  );
}

export default App;


//const App= ()=> 
//   (
//    <div className="App">
//      <h1>deepak</h1> 
//    </div>
//);
//




