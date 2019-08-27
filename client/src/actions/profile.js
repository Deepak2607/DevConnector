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
