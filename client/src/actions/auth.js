import {REGISTER_SUCCESS, REGISTER_FAILURE} from './types';
import {setAlert }from './alert';
import axios from 'axios';


export const register= (user)=> dispatch =>{
    
    const config= {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body= JSON.stringify(user);

    axios.post('/users/register',body, config).then((response)=> {
        console.log(response);
        dispatch({
            type:REGISTER_SUCCESS
        })
    }).catch(err=> {
        console.log(err.response.data);
        setAlert(err.response.data.message,"danger");
        dispatch({
            type:REGISTER_FAILURE
        })
    })
            
}
