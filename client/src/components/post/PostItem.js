import React from 'react';
import { Link} from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';


const PostItem = (props) => {
     
   return(    
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${props.post.user}`}>
                <img className='round-img' src={props.post.avatar} alt='' />
                <h4>{props.post.name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">{props.post.text}</p>
            <p className="post-date"> Posted on <Moment format='DD/MM/YYYY'>{props.post.date}</Moment> </p>
          </div>
        </div> 
    );
};

export default PostItem;