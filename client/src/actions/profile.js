import {GET_PROFILE, PROFILE_ERROR} from './types';
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
          payload: response.data
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
