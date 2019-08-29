import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, LOGOUT} from './types';
import {setAlert }from './alert';
import axios from 'axios';


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
        console.log(err.response);
        
//        let errors= err.response.data;
//        errors.forEach(error=> {
//            dispatch(setAlert(error.message,"danger"));
//        })
    })
}



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
        console.log(err.response);
        
//        let errors= err.response.data;
//        errors.forEach(error=> {
//            dispatch(setAlert(error.message,"danger"));
//        })
    })
}


export const deleteExperience= (id)=> dispatch=> {
    
    axios.delete(`/profiles/experience/${id}`).then(response=> {
        
        console.log(response);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
        dispatch(setAlert('Experience deleted', 'success'));
    }).catch(err=> {
        console.log(err);
    })
}


export const deleteEducation= (id)=> dispatch=> {
    
    axios.delete(`/profiles/education/${id}`).then(response=> {
        
        console.log(response);
        
        dispatch({
            type:GET_PROFILE,
            data:response.data
        })
        dispatch(setAlert('Education deleted', 'success'));
    }).catch(err=> {
        console.log(err);
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
        }) 
           
  }
};



