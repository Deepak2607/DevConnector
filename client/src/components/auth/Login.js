import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


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
            
            const config= {
                headers:{
                    'Content-Type':'application/json'
                }
            }
            const body= JSON.stringify(user);
           
            axios.post('/users/login',body, config).then((response)=> {
                console.log(response);
            }).catch(err=> {
                console.log(err);
            })
            
            this.setState({
                email:"",
                password:""
            })
                    
        }
    }
    
    
    

render(){
    
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

export default Login


