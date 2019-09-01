import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, LOGOUT, GET_PROFILES, GET_REPOS} from './types';
import {setAlert }from './alert';
import axios from 'axios';


//getting profile of mine (authenticated user)
export const getCurrentProfile= ()=> dispatch=> {
    
    axios.get('/profiles/my_profile').then(response=> {
        
        console.log(response.data);
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            data:err.response.data
        })
    })
}


//getting all profiles
export const getProfiles=()=> dispatch=>{
    
    
    axios.get('/profiles').then(response=> {
        console.log(response);
        
        dispatch({
            type:GET_PROFILES,
            data:response.data
        })
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            data:err.response.data
        })
    })
}


//getting profile of each user by... user_id
export const getProfileById=(id)=> dispatch=>{
    
    axios.get(`/profiles/user/${id}`).then(response=> {
        console.log(response);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            data:err.response.data
        })
    })
}



//creating my profile
export const createProfile= (formData, history)=> dispatch=> {
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    axios.post('/profiles/create',formData, config).then(response=> {
        console.log(response);
        
        dispatch({
          type: GET_PROFILE,
          data: response.data
        });

        dispatch(setAlert('Profile Created', 'success'));
        history.push('/dashboard');  
        
    }).catch(err=> {
        console.log(err.response.data);
        
        let errors= err.response.data;
        errors.forEach(error=> {
            dispatch(setAlert(error.message,"danger"));
        })
    })
}


//editing my profile
export const editProfile= (formData, history)=> dispatch=> {
    
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    axios.put('/profiles/edit_profile',formData, config).then(response=> {
        console.log(response);
        
        dispatch({
          type: GET_PROFILE,
          data: response.data
        });

        dispatch(setAlert('Profile Updated', 'success'));
        history.push('/dashboard');  
        
    }).catch(err=> {
        console.log(err.response.data);
        
        let errors= err.response.data;
        errors.forEach(error=> {
            dispatch(setAlert(error.message,"danger"));
        })
    })
}



//adding experience to my profile
export const addExperience=(formData, history)=> dispatch=>{
     
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    axios.put('/profiles/experience', formData, config).then(response=> {
        
        console.log(response.data);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
        
    }).catch(err=> {
        console.log(err.response.data);
        
//        let errors= err.response.data;
//        errors.forEach(error=> {
//            dispatch(setAlert(error.message,"danger"));
//        })
    })
}



//adding education to my profile
export const addEducation=(formData, history)=> dispatch=>{
     
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    axios.put('/profiles/education', formData, config).then(response=> {
        
        console.log(response.data);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
        
        dispatch(setAlert('Education Added', 'success'));
        history.push('/dashboard');
        
    }).catch(err=> {
        console.log(err.response.data);
        
//        let errors= err.response.data;
//        errors.forEach(error=> {
//            dispatch(setAlert(error.message,"danger"));
//        })
    })
}


//deleting my experience
export const deleteExperience= (id)=> dispatch=> {
    
    axios.delete(`/profiles/experience/${id}`).then(response=> {
        
        console.log(response);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
        dispatch(setAlert('Experience deleted', 'success'));
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            data:err.response.data
        })
    })
}


//deleting my education
export const deleteEducation= (id)=> dispatch=> {
    
    axios.delete(`/profiles/education/${id}`).then(response=> {
        
        console.log(response);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
        dispatch(setAlert('Education deleted', 'success'));
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            data:err.response.data
        })
    })
}


// Delete account & profile
export const deleteAccount = (history) => dispatch => {
    
  if (window.confirm('Are you sure to delete your account?')) {
        
        axios.delete('/profiles/delete').then(response=> {
          console.log(response.data);
          
          window.location.reload(); 
          dispatch(setAlert('Your account has been deleted')); 
          
//          axios.get('/users/logout').then(response=> {
//            dispatch({
//                type:LOGOUT
//            });
//          })
        
        }).catch (err=>{
            console.log(err.response);
            dispatch({
                type:PROFILE_ERROR,
                data:err.response.data
            })
        })           
  }
};


//getting github repos of a user by... github_username
export const getGithubRepos=(username)=> dispatch=>{
    
    axios.get(`/profiles/github/${username}`).then(response=> {
        console.log(response);
        
        dispatch({
            type:GET_REPOS,
            data:response.data
        })
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:PROFILE_ERROR,
            data:err.response.data
        })
    })
}





