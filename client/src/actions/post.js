import axios from 'axios';
import { setAlert } from './alert';
import {GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from './types';


//getting a post by post_id
export const getPost=(id)=> dispatch => {
    
    
    axios.get(`/posts/${id}`).then(response=> {
        
        console.log(response.data);
        dispatch({
            type:GET_POST,
            data:response.data
        })
        
    }).catch(err=> {
        
        console.log(err.response);
        dispatch({
            type:POST_ERROR,
            data:err.response.data
        })
    })
}


//getting all posts
export const getPosts=()=> dispatch => {
    
    axios.get('/posts').then(response=> {
        
        console.log(response.data);
        dispatch({
            type:GET_POSTS,
            data:response.data
        })
        
    }).catch(err=> {
        
        console.log(err.response);
        dispatch({
            type:POST_ERROR,
            data:err.response.data
        })
    })
}


//updating likes of a post.. id is post_id
export const updateLikes=(id)=> dispatch => {
    
    axios.put(`/posts/likes/${id}`).then(response=> {
        
        console.log(response.data);
        dispatch({
            type:UPDATE_LIKES,
            data:{id, likes: response.data}
        })
        
    }).catch(err=> {
        
        console.log(err.response);
        dispatch({
            type:POST_ERROR,
            data:err.response.data
        })
    })
}



//deleting a post.. id is post_id
export const deletePost=(id)=> dispatch => {
    
    axios.delete(`/posts/${id}`).then(response=> {
        
        console.log(response.data);
        dispatch({
            type:DELETE_POST,
            data:id
        })
        
        dispatch(setAlert("Post removed", "success"));
        
    }).catch(err=> {
        
        console.log(err.response);
        dispatch({
            type:POST_ERROR,
            data:err.response.data
        })
    })
}



//adding a post
export const addPost=(formData)=> dispatch => {
    
    
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
    
    axios.post('/posts',formData, config).then(response=> {
        
        console.log(response.data);
        dispatch({
            type:ADD_POST,
            data:response.data
        })
        
        dispatch(setAlert("Post created", "success"));
        
    }).catch(err=> {
        
        console.log(err.response);
        dispatch({
            type:POST_ERROR,
            data:err.response.data
        })
    })
}