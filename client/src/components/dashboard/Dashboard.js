import React, {div, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';

import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import {getCurrentProfile} from '../../actions/profile';
import {deleteAccount} from '../../actions/profile';
import {setAlert} from '../../actions/alert';
import store from '../../store';

const Dashboard= (props)=> {
    
    
    //this function is used here because.. this function runs only on reloading
    //props.getCurrentProfile(); runs infinite times if it is put here lonely
    useEffect(() => {
        store.dispatch(getCurrentProfile());
      }, []);
    
    
//    if(!props.isAuthenticated && !props.loading){
//        return <Redirect to='/login' />;
//    }else if(!props.isAuthenticated && props.loading){
//        return "loading...."
//    }
    
    
    return(
        <div className="container-fluid">
        
        <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
          <i className='fas fa-user' /> Welcome {props.user && props.user.name}
          </p>
        
          {props.profile !== null ? (
            <div>
              <DashboardActions />
              <Experience experience={props.profile.experience} />
              <Education education={props.profile.education} />
        
              <div className='my-2'>
                <button className='btn btn-danger' onClick={()=>props.deleteAccount(props.history)}>
                  <i className='fas fa-user-minus' /> Delete My Account
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </div>
          )}
        
        </div>
    ); 

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth_reducer.isAuthenticated,
  user:state.auth_reducer.user,
  profile:state.profile_reducer.profile,
  loading:state.profile_reducer.loading,
  error:state.profile_reducer.error
});

export default connect(mapStateToProps,{getCurrentProfile,setAlert,deleteAccount})(withRouter(Dashboard));
