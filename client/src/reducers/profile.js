import {GET_PROFILE, PROFILE_ERROR} from '../actions/types';

const initialState={
      profile: null,
      profiles: [],
//      repos: [],
//      loading: true,
      error:null
};


const profile_reducer= (state=initialState, action)=> {
    
    switch(action.type){  
        case GET_PROFILE:
            return{
                ...state,
                profile:action.data       
            }   
        case PROFILE_ERROR:
            return{
                ...state,
                profile:null,
                error:action.data
            }
        default:
            return state;
    }  
}

export default profile_reducer