import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { loadUser } from '../../actions/auth';
import store from '../../store';


const Posts=(props)=> {
    
    //i'm loading authenticated user here before loading all posts, because loading a user (in App.js) is taking more time as compared to that of loading the posts (here).
    //so before doing it, props.user._id was undefined because user was loading after loading of posts.
    //now, here user is loading before loading of posts, so props.user._id is defined now.
    //despite of this, sometimes (1 out of 10) posts are loaded before user, while refreshing.
//->from next time, you should use async await...
    //this problem could be solved by delaying, so in that time user will be loaded also (in App.js)
    
     useEffect(() => {
            store.dispatch(loadUser());
      }, []);
    
    useEffect(() => {
            store.dispatch(getPosts());
      }, []);
    
    console.log(props.posts);
    
    return( 
        
        <div>
        {(props.loading) ? <div>loading...</div> : (
         
             <div>
              <h1 className='large text-primary'>Posts</h1>
              <p className='lead'><i className='fas fa-user' />Welcome to the community</p>

              <PostForm/>
              <PostItem posts={props.posts} />
            </div>
         
         )}
        </div>
    )
}

const mapStateToProps = state => ({
    posts: state.post_reducer.posts,
    loading:state.post_reducer.loading
});


export default connect(mapStateToProps, {getPosts})(Posts);