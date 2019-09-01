import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { updateLikes, deletePost} from '../../actions/post';


const PostItem= (props)=> {
  
    return(
    
        <div className="posts">
            
        {props.posts.map(post=> {
        
            return(
                
                    <div key={post._id} className="post bg-white p-1 my-1">
                      <div> 
                        <Link to="">
                            <img className='round-img' src={post.avatar} alt='' />
                            <h4>{post.name}</h4>
                        </Link>
                      </div>

                      <div>
                        <p className="my-1">{post.text}</p>
                        <p className="post-date"> Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment> </p>

                        <button onClick={()=> props.updateLikes(post._id)} type="button" className="btn btn-light">
                          <i className="fas fa-thumbs-up"></i>{' '}
                          {(post.likes.length>0)? (
                          <span>{post.likes.length}</span>
                          ) : null}
                        </button>


                        <Link to="" className="btn btn-primary">
                          Discussion{' '}{(post.comments.length>0)? (
                          <span className='comment-count'>{post.comments.length}</span>
                          ) : null}
                        </Link>
        
                        {( post.user && post.user === props.user._id) && (   
                            <button onClick={()=> props.deletePost(post._id)} type="button" className="btn btn-danger">
                            <i className="fas fa-times"></i>
                            </button>
                         )}
                         
                      </div>
                    </div>
        
                )

            })}

        
        </div>
    )
}


const mapStateToProps = state => ({
  loading: state.auth_reducer.loading,
  user: state.auth_reducer.user
});

export default connect(mapStateToProps, { updateLikes, deletePost})(PostItem);


