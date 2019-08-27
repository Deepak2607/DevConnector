import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {getCurrentProfile} from '../../actions/profile';
import {setAlert} from '../../actions/alert';
import store from '../../store';

const Dashboard= (props)=> {
    
    
    //this function is used here because.. this function runs only on reloading
    //props.getCurrentProfile(); runs infinite times if it is put here lonely
    useEffect(() => {
        store.dispatch(getCurrentProfile());
      }, []);
    
    
    if(!props.isAuthenticated){
        props.setAlert("you need to login first!",'danger');
        return <Redirect to='/login' />;
    }
    
    
    let content=null;
    if(props.profile){
        content=props.profile.githubusername;
    }else{
        content=props.error;
    }
    
    
    return(    
        <div className="container-fluid">
        {content}
        </div>
    );
    
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth_reducer.isAuthenticated,
  profile:state.profile_reducer.profile,
  error:state.profile_reducer.error
});

export default connect(mapStateToProps,{getCurrentProfile,setAlert})(Dashboard);
