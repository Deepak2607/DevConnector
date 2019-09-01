import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import store from '../../store';


const Posts=(props)=> {
    
     useEffect(() => {
            store.dispatch(getPosts());
      }, []);
    
    
    
    console.log(props.posts);
    return(  
        <div>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'><i className='fas fa-user' />Welcome to the community</p>

          <PostForm/>
          <PostItem posts={props.posts} />
        </div>
    )
}

const mapStateToProps = state => ({
  posts: state.post_reducer.posts
});


export default connect(mapStateToProps, {getPosts})(Posts);