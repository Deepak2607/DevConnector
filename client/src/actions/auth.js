import {REGISTER_SUCCESS, REGISTER_FAILURE,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT, USER_LOADED,AUTH_ERROR} from './types';
import {setAlert }from './alert';
import axios from 'axios';


//for registration
export const register= (user, history)=> dispatch =>{
    
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
        dispatch(setAlert("You are successfully registered",'success'));
        history.push('/login');
        
    }).catch(err=> {
        console.log(err.response.data);
        let errors= err.response.data;
        dispatch({
            type:REGISTER_FAILURE
        })
        errors.forEach(error=> {
            dispatch(setAlert(error.message,"danger"));
        })
    })          
}


//for login
export const login= (user)=> dispatch =>{
    
    const config= {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body= JSON.stringify(user);

    axios.post('/users/login',body, config).then((response)=> {
        console.log(response.data);
        dispatch({
            type:LOGIN_SUCCESS,
            data:response.data
        })
        dispatch(setAlert("You are successfully logged in",'success'));
    }).catch(err=> {
        console.log(err.response);
        dispatch({
            type:LOGIN_FAILURE
        })
        let error= err.response.data;
        dispatch(setAlert(error,"danger"));
        
    })          
}


//logout
export const logout=()=> dispatch=> {
    
    axios.get('/users/logout').then(response=> {
        console.log(response);
        dispatch({
            type:LOGOUT
        })
    })
}


//to load authenticated user
export const loadUser=()=> dispatch=> {
    
    axios.get('/auth').then(response=> {
        console.log(response);
        dispatch({
            type:USER_LOADED,
            data:response.data
        })
    }).catch(err=> {
        console.log(err);
        dispatch({
            type:AUTH_ERROR,
        })
    })
}
