import {REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/types';

const initialState={
    isRegistered:false,

    isAuthenticated:null,
    user:null,
    loading:false
}

const auth_reducer=(state=initialState, action)=> {
    
    switch(action.type){  
        case REGISTER_SUCCESS:
            return{
                ...state,
                isRegistered:true,
                loading:false        
            }   
        case REGISTER_FAILURE:
            return{
                ...state,
                isRegistered:false,
                loading:false
            }
        default:
            return state;
    }       
}

export default auth_reducer