import React, { useEffect, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

class Profile extends Component{
      
//  useEffect(() => {
//        store.dispatch(getProfileById(props.match.params.id));
//  }, []);
//  console.log(props.profile);
    
  
  //I'm adding a delay of 0.4 second in rendering of this component because it was rendering old profile stored in profile(in profile_reducer) before complete execution of getProfileById(...) action.
  constructor() {
        super();
        this.state = {
            render: false 
        }
    }

  componentDidMount() {
      
      this.props.getProfileById(this.props.match.params.id);
      
      setTimeout(() => { 
          this.setState({render: true})
      }, 400)
  }

  render(){
      
      
      console.log(this.props.match.params);
      
      if(this.state.render==false){
          return <div>loading...</div>
      }
        
      return (
        <div>
          {(!this.props.profile || this.props.loading ) ? <div>loading...</div> :

           (
               <div>
               <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>

               { (this.props.isAuthenticated && !this.props.loading && this.props.user._id===this.props.profile.user._id) ?
                <Link to='/edit-profile' className="btn btn-dark">Edit Profile </Link> 
               : null }

               <div className='profile-grid my-1'>
               <ProfileTop profile={this.props.profile}/>
               <ProfileAbout profile={this.props.profile}/>
               <ProfileExperience profile={this.props.profile}/>
               <ProfileEducation profile={this.props.profile}/>
               <ProfileGithub profile={this.props.profile}/>
               </div>

               </div>


           )}
        </div>
      )
  }
};


const mapStateToProps = state => ({
  profile: state.profile_reducer.profile,
  isAuthenticated: state.auth_reducer.isAuthenticated,
  user: state.auth_reducer.user,
  loading:state.profile_reducer.loading
});

export default connect(mapStateToProps,{ getProfileById })(Profile);
