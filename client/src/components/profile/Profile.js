import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';
//import ProfileTop from './ProfileTop';
//import ProfileAbout from './ProfileAbout';
//import ProfileExperience from './ProfileExperience';
//import ProfileEducation from './ProfileEducation';
//import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = (props) => {
      
  useEffect(() => {
        store.dispatch(getProfileById(props.match.params.id));
  }, []);
  console.log(props.profile);
    
  return (
    <div>
      {(!props.profile || props.loading ) ? (<div>loading...</div>) : (
       
           <div>
           <Link to='/profiles' className="btn btn-light">Back to Profiles</Link>
           {(props.isAuthenticated && !props.loading && props.user._id==props.profile.user._id) ? ( <Link to='/edit-profile' className="btn btn-dark">Edit Profile</Link> ) : null }
           </div>
       
       )}
    </div>
  );
};


const mapStateToProps = state => ({
  profile: state.profile_reducer.profile,
  isAuthenticated: state.auth_reducer.isAuthenticated,
  user: state.auth_reducer.user,
  loading:state.profile_reducer.loading
});

export default connect(mapStateToProps,{ getProfileById })(Profile);
