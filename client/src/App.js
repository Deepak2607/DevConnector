import React, {Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

const App= ()=> {
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




