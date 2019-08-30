import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile,  editProfile } from "../../actions/profile";





class EditProfile extends Component{
      
    constructor(){
        super();
        
        this.state={
//            company: this.props.profile.company,
//            website: this.props.profile.website,
//            location: this.props.profile.location,
//            status: this.props.profile.status,
//            skills: this.props.profile.skills,
//            githubusername: this.props.profile.githubusername,
//            bio: this.props.profile.bio,
//            twitter: this.props.profile.social.twitter,
//            facebook: this.props.profile.social.facebook,
//            linkedin: this.props.profile.social.linkedin,
//            youtube: this.props.profile.social.youtube,
//            instagram: this.props.profile.social.instagram,
            
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubusername: "",
            bio: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",

            showLinks:false
        }    
    }
    
    handleCompany=(event)=> {
        this.setState({
            company:event.target.value
        })
    }
    
    handleWebsite=(event)=> {
        this.setState({
            website:event.target.value
        })
    }
    
    handleLocation=(event)=> {
        this.setState({
            location:event.target.value
        })
    }
    
    handleStatus=(event)=> {
        this.setState({
            status:event.target.value
        })
    }
    
    handleSkills=(event)=> {
        this.setState({
            skills:event.target.value
        })
    }
    
    handleGithubUsername=(event)=> {
        this.setState({
            githubusername:event.target.value
        })
    }
    
    handleBio=(event)=> {
        this.setState({
            bio:event.target.value
        })
    }
    
    handleTwitter=(event)=> {
        this.setState({
            twitter:event.target.value
        })
    }
    
    handleFacebook=(event)=> {
        this.setState({
            facebook:event.target.value
        })
    }
    
    handleLinkedin=(event)=> {
        this.setState({
            linkedin:event.target.value
        })
    }
    
    handleYoutube=(event)=> {
        this.setState({
            youtube:event.target.value
        })
    }
    
    handleInstagram=(event)=> {
        this.setState({
            instagram:event.target.value
        })
    }
    
    onSubmit=(event)=> {
        event.preventDefault();
        
        const formData={
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        } 
              
              
        this.props.editProfile(formData, this.props.history);
    }
    
    toggleLinks=()=> {
        this.setState({
            showLinks:!this.state.showLinks
        })
    }
    
    
    //this function runs when the component is reloaded, similar to useEffect() hook.
    //we can't use useEffect() hook in class component so we are using this function to call the action getCurrentProfile()
    componentDidMount=()=> {
        console.log(this.props.history);
        this.props.getCurrentProfile();
    }
    
    
render(){
    
    
//    if(!this.props.isAuthenticated && !this.props.loading){
//        return <Redirect to='/login' />;
//    }else if(!this.props.isAuthenticated && this.props.loading){
//        return "loading...."
//    }
    

       
    return(
            
     <div>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Let's get some information to make your profile stand out
      </p>
      <small>* = required field</small>
        
      <form className='form' onSubmit={this.onSubmit}>
        
        <div className='form-group'>
          <select name='status' value={this.state.status} onChange={this.handleStatus}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={this.state.company}
            onChange={this.handleCompany}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={this.state.website}
            onChange={this.handleWebsite}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={this.state.location}
            onChange={this.handleLocation}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
    
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={this.state.skills}
            onChange={this.handleSkills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
    
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={this.state.githubusername}
            onChange={this.handleGithubUsername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
    
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={this.state.bio}
            onChange={this.handleBio}
          />
          <small className='form-text'>Tell us a little about yourself</small>
        </div>
    
    
        <div className='my-2'>
          <button onClick={this.toggleLinks} type='button' className='btn btn-light'>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
    
    
        {this.state.showLinks && (
          <div>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x' />
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={this.state.twitter}
                onChange={this.handleTwitter}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x' />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={this.state.facebook}
                onChange={this.handleFacebook}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x' />
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={this.state.youtube}
                onChange={this.handleYoutube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x' />
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={this.state.linkedin}
                onChange={this.handleLinkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x' />
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={this.state.instagram}
                onChange={this.handleInstagram}
              />
            </div>
          </div>
        )}



        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </div>
           
    )
  }  
};



const mapStateToProps = state => ({
  profile: state.profile_reducer.profile,
  loading:state.profile_reducer.loading
});

export default connect(mapStateToProps,{ getCurrentProfile, editProfile })(withRouter(EditProfile));