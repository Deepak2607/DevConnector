import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {loadUser} from '../../actions/auth';
import {login} from '../../actions/auth';
import {setAlert} from '../../actions/alert';


class Login extends Component{
    
    constructor(){
        super();
        this.state={
            email:"",
            password:"",
        }
    }
    
    //this input data doesn't have any use, so it is not included into redux
    //all the useful data is only..the data saved in database, so they are included in redux
    //and can be accessed anywhere
    
    handleEmail=(event)=> {

        this.setState({
            email:event.target.value
        })
    }

    handlePassword=(event)=> {

        this.setState({
            password:event.target.value
        })
    }

    handleSubmit=(event)=> {
        event.preventDefault();

        const user={
            email:this.state.email,
            password:this.state.password
        }

        this.props.login(user);


//            const config= {
//                headers:{
//                    'Content-Type':'application/json'
//                }
//            }
//            const body= JSON.stringify(user);
//           
//            axios.post('/users/login',body, config).then((response)=> {
//                console.log(response);
//            }).catch(err=> {
//                console.log(err);
//            })
            
        this.setState({
            email:"",
            password:""
        })                   
    }
    
    
render(){
    
    
    console.log(this.props.user);
    
    if (this.props.isAuthenticated){
        return <Redirect to='/dashboard' />;
    }
    
    
    //when a page is reloaded or moving to any url.. user-> unAuthenticated & loading-> true (i.e. default state)
    //this is used to hide the view of ..say intermediate components
    if(! this.props.isAuthenticated && this.props.loading){
        return "loading...."
    }
    
    
    return(
    
        <div>
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
          <form className="form" onSubmit={this.handleSubmit}>
            
            <div className="form-group">
              <input type="email" placeholder="Email Address" name="email" onChange={this.handleEmail} value={this.state.email} required />
            </div>
        
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="4"
                onChange={this.handlePassword}
                value={this.state.password}
              />
            </div>
        
            <input type="submit" className="btn btn-primary" value="Login" />
          </form>
          <p className="my-1">
            Do not have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
    )
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth_reducer.isAuthenticated,
  user: state.auth_reducer.user,
  loading:state.auth_reducer.loading
});

export default connect(mapStateToProps, {login,loadUser,setAlert})(Login);


