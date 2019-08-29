import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

class AddExperience extends Component{
    
    constructor(){
        super();
        
        this.state={
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            description: '',
            current: false,
            toDate_disabled:false
        }
    }
    
    
    handleCompany=(event)=> {
        this.setState({
            company:event.target.value
        })
    }
    
    handleTitle=(event)=> {
        this.setState({
            title:event.target.value
        })
    }
    
    handleLocation=(event)=> {
        this.setState({
            location:event.target.value
        })
    }
    
    handleFrom=(event)=> {
        this.setState({
            from:event.target.value
        })
    }
    
    handleTo=(event)=> {
        this.setState({
            to:event.target.value
        })
    }
    
    handleDescription=(event)=> {
        this.setState({
            description:event.target.value
        })
    }
    
    handleCurrent=(event)=> {
        this.setState({
            current:! this.state.current,
            toDate_disabled:! this.state.toDate_disabled
        })
    }
    
    
    onSubmit=(event)=> {
        
        event.preventDefault();
        
        const formData= {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        }
        
        this.props.addExperience(formData, this.props.history);
    }
    
    
  
    
    
    //this function runs when the component is reloaded, similar to useEffect() hook.
    //we can't use useEffect() hook in class component so we are using this function to call the action getCurrentProfile()
    componentDidMount=()=> {
        console.log(this.props.history);
//        this.props.getCurrentProfile();
    }
    
    
    
    
    
    
 

  
render(){
    
      return (
        <div>
          <h1 className='large text-primary'>Add An Experience</h1>
          <p className='lead'>
            <i className='fas fa-code-branch' /> Add any developer/programming positions
            that you have had in the past
          </p>
          <small>* = required field</small>
          
          <form className='form' onSubmit={this.onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Job Title'
                name='title'
                value={this.state.title}
                onChange={this.handleTitle}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Company'
                name='company'
                value={this.state.company}
                onChange={this.handleCompany}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Location'
                name='location'
                value={this.state.location}
                onChange={this.handleLocation}
              />
            </div>
            <div className='form-group'>
              <h4>From Date</h4>
              <input
                type='date'
                name='from'
                value={this.state.from}
                onChange={this.handleFrom}
              />
            </div>
            <div className='form-group'>
              <p>
                <input
                  type='checkbox'
                  name='current'
                  checked={this.state.current}
                  value={this.state.current}
                  onChange={this.handleCurrent}
                />{' '}
                Current Job
              </p>
            </div>
            <div className='form-group'>
              <h4>To Date</h4>
              <input
                type='date'
                name='to'
                value={this.state.to}
                onChange={this.handleTo}
                disabled={this.state.toDate_disabled ? 'disabled' : ''}
              />
            </div>
            <div className='form-group'>
              <textarea
                name='description'
                cols='30'
                rows='5'
                placeholder='Job Description'
                value={this.state.description}
                onChange={this.handleDescription}
              />
            </div>
            <input type='submit' className='btn btn-primary my-1' />
            <Link className='btn btn-light my-1' to='/dashboard'>
              Go Back
            </Link>
          </form>
        </div>
      )
    }
}

export default connect(null,{ addExperience })(withRouter(AddExperience));
