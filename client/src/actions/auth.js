import {REGISTER_SUCCESS, REGISTER_FAILURE, REGISTERED,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT, USER_LOADED,AUTH_ERROR} from './types';
import {setAlert }from './alert';
import axios from 'axios';


//for registration
export const register= (user)=> dispatch =>{
    
    const config= {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body= JSON.stringify(user);

    axios.post('/users/register',body, config).then((response)=> {
        console.log(response);
        dispatch(setAlert("You are successfully registered",'success'));
        dispatch({
            type:REGISTER_SUCCESS
        })
    }).catch(err=> {
        console.log(err.response.data);
        let errors= err.response.data;
        errors.forEach(error=> {
            dispatch(setAlert(error.message,"danger"));
        })
        dispatch({
            type:REGISTER_FAILURE
        })
    })          
}


//after registration
export const registered=()=> dispatch=> {
    dispatch({
        type:REGISTERED
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
        dispatch(setAlert("You are successfully logged in",'success'));
        dispatch({
            type:LOGIN_SUCCESS,
            data:response.data
        })
    }).catch(err=> {
        console.log(err.response.data);
//        let errors= err.response.data;
//        errors.forEach(error=> {
//            dispatch(setAlert(error.message,"danger"));
//        })
        dispatch({
            type:LOGIN_FAILURE
        })
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
    }).then(err=> {
        console.log(err);
        dispatch({
            type:AUTH_ERROR,
        })
    })
}
