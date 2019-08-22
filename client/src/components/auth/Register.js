import React, { Component } from 'react';

class Register extends Component{
    
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            users:[]
        }
        
        this.handleName=(event)=> {
            
            this.setState({
                name:event.target.value
            })
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
        
        this.handleConfirmPassword=(event)=> {
            
            this.setState({
                confirmPassword:event.target.value
            })
        }
        
        this.handleSubmit=(event)=> {
            event.preventDefault();
            
            if(this.state.password !== this.state.confirmPassword){
                alert("passwords not matching");
                return;
            }
            
            const user={
                name:this.state.name,
                email:this.state.email,
                password:this.state.password,
                confirmPassword:this.state.confirmPassword
            }
            
            this.setState({
                name:"",
                email:"",
                password:"",
                confirmPassword:"",
            })
            
            console.log(user);
                    
        }
    }
    
    
    

render(){
    
    return(
    
        <div>
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" placeholder="Name" name="name" onChange={this.handleName} value={this.state.name} required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" name="email" onChange={this.handleEmail} value={this.state.email} required />
              <small className="form-text"
                >This site uses Gravatar so if you want a profile image, use a
                Gravatar email</small
              >
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                onChange={this.handleConfirmPassword}
                value={this.state.confirmPassword}
              />
            </div>
            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <a href="login.html">Sign In</a>
          </p>
        </div>
    )
  }
}

export default Register