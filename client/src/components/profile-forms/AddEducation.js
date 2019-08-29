import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

class AddEducation extends Component{
    
    constructor(){
        super();
        
        this.state={
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            description: '',
            current: false,
            toDate_disabled:false
        }
    }
    
    
    handleSchool=(event)=> {
        this.setState({
            school:event.target.value
        })
    }
    
    handleDegree=(event)=> {
        this.setState({
            degree:event.target.value
        })
    }
    
    handleFieldOfStudy=(event)=> {
        this.setState({
            fieldofstudy:event.target.value
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
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        }
        
        this.props.addEducation(formData, this.props.history);
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
          <h1 className='large text-primary'>Add Your Education</h1>
          <p className='lead'>
            <i className='fas fa-code-branch' /> Add any school or college that you
            have attended
          </p>
          <small>* = required field</small>
          
          <form className='form' onSubmit={this.onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* School or College'
                name='school'
                value={this.state.school}
                onChange={this.handleSchool}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='* Degree or Certificate'
                name='degree'
                value={this.state.degree}
                onChange={this.handleDegree}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                placeholder='Field of Study'
                name='fieldofstudy'
                value={this.state.fieldofstudy}
                onChange={this.handleFieldOfStudy}
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
                Current School/College
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
                placeholder='Program Description'
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

export default connect(null,{ addEducation })(withRouter(AddEducation));