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
        
        this.handleEmail=(event)=> {
            
            this.setState({
                email:event.target.value
            })
        }
        
        this.handlePassword=(event)=> {
            
            this.setState({
                password:event.target.value
            })
        }
        
        this.handleSubmit=(event)=> {
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
//            
//            this.setState({
//                email:"",
//                password:""
//            })
            
            this.setState({
                email:"",
                password:""
            })                   
        }
    }
    
render(){
    
    console.log(this.props.isAuthenticated);
    
//    if (this.props.isAuthenticated) {
//        return <Redirect to='/dashboard' />;
//      }
    
      if (this.props.isAuthenticated) {
        this.props.history.push('/dashboard');
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
                minLength="6"
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
  user: state.auth_reducer.user
});

export default connect(mapStateToProps, {login,loadUser,setAlert})(Login);


