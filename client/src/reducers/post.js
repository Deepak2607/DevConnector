import {GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from '../actions/types';


let initialState={
    post:null,
    posts:[],
    loading:true,
    error:null,
}

const post_reducer=(state=initialState, action)=> {
    
    switch(action.type){
        case GET_POST:
            return{
                ...state,
                loading:false,
                error:null,
                post:action.data,
            }
       case GET_POSTS:
            return{
                ...state,
                loading:false,
                error:null,
                posts:action.data,
            }
       case POST_ERROR:
            return{
                ...state,
                loading:false,
                error:null,
                posts:action.data,
            }
       case UPDATE_LIKES:
            
            let posts_1= state.posts.map(post=> {
                if(post._id===action.data.id){
                    post.likes=action.data.likes
                }
                return post;
            })
            return{
                ...state,
                loading:false,
                posts:posts_1
            }
        case ADD_POST:
            return{
                ...state,
                loading:false,
                posts:[action.data, ...state.posts]
            }
        case DELETE_POST:
            
            let posts_3= state.posts.filter(post=> {
                return (post._id!==action.data)    
            })
            return{
                ...state,
                loading:false,
                posts:posts_3
            }
        default:
            return state;
            
    }
}

export default post_reducer