import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
//importing actions
import {register} from '../../actions/auth';
import {setAlert} from '../../actions/alert';


class Register extends Component{
    
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
        }
        
        //this input data doesn't have any use, so it is not included into redux
        //all the useful data is only..the data saved in database, so they are included in redux
        //and can be accessed anywhere
        
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
                this.props.setAlert("passwords not matching",'danger');
                return;
            }
            
            const user={
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            }
            
            this.props.register(user);
            
//            const config= {
//                headers:{
//                    'Content-Type':'application/json'
//                }
//            }
//            const body= JSON.stringify(user);
//            
//            axios.post('/users/register',body, config).then((response)=> {
//                console.log(response);
//            }).catch(err=> {
//                console.log(err);
//            })
            
            this.setState({
                name:"",
                email:"",
                password:"",
                confirmPassword:"",
            })
        }
    }
    
    
    

render(){
    
    
    if (this.props.isRegistered) {
        return <Redirect to='/login' />;
      }
  
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
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
    )
  }
}


const mapStateToProps = state => ({
  isRegistered: state.auth_reducer.isRegistered
});

//connect is used to connect this component and actions...
//by using this line, actions can be accessed as... this.props.register
export default connect(mapStateToProps, {register, setAlert})(Register);