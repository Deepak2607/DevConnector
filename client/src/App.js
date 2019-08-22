import React, {Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const App= ()=> {
  return (
    <BrowserRouter>
     
      <Navbar/>
      <Route exact path="/" component={Landing} />
      
      <div className="container">
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      </div>
 
    </BrowserRouter>
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




