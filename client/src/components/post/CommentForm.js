import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


class CommentForm extends Component{
    
      constructor(){
          super();
          this.state={
              text:""
          }
      }
    
    handleText=(event)=> {
        this.setState({
            text:event.target.value
        })
    }
    
    onSubmit=(event)=> {
        
        event.preventDefault();   
        let formData={
            text:this.state.text
        }  
        this.props.addComment(formData,this.props.postId);
        
        this.setState({
            text:""
        })
    }
   
    render(){

          return (
            <div className='post-form'>
              <div className='bg-primary p'>
                <h3>Leave a Comment</h3>
              </div>
              <form className='form my-1'onSubmit={this.onSubmit}>
                <textarea name='text' cols='30' rows='5' placeholder='Create a post' value={this.state.text} onChange={this.handleText} required/>
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
              </form>
            </div>
          );
    }
};


export default connect(null,{ addComment })(CommentForm);
