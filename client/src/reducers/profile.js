import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE} from '../actions/types';

const initialState={
      profile: null,
      profiles: [],
//      repos: [],
      loading: true,
      error:null
};


const profile_reducer= (state=initialState, action)=> {
    
    switch(action.type){  
        case GET_PROFILE:
            return{
                ...state,
                profile:action.data,
                loading:false,
                error:null
            }   
        case PROFILE_ERROR:
            return{
                ...state,
                profile:null,
                error:action.data,
                loading:false 
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                loading:false
            }
        default:
            return state;
    }  
}

export default profile_reducer