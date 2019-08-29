import {REGISTER_SUCCESS, REGISTER_FAILURE,LOGIN_SUCCESS,LOGIN_FAILURE,LOGOUT,USER_LOADED,AUTH_ERROR } from '../actions/types';

const initialState={
    isAuthenticated:false,
    user:null,
    loading:true
}

const auth_reducer=(state=initialState, action)=> {
    
    switch(action.type){  
        case REGISTER_SUCCESS:
            return{
                ...state,
                loading:false        
            }   
        case REGISTER_FAILURE:
            return{
                ...state,
                loading:false
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated:true,
                user:action.data,
                loading:false
            }
        case LOGOUT:
            return{
                ...state,
                isAuthenticated:false,
                user:null,
                loading:false
            }
        case LOGIN_FAILURE:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null
            }
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                user:action.data,
                loading:false
            }
        case AUTH_ERROR:
            return{
                ...state,
                isAuthenticated:false,
                user:null,
                loading:false
            }
        default:
            return state;
    }       
}

export default auth_reducer