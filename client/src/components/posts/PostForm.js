import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';


class PostForm extends Component{
    
    
    constructor(){
        super();
        this.state={
            text:""
        }
    }
    
    handleTextarea=(event)=> { 
        this.setState({
            text:event.target.value
        })
    }
    
    onSubmit=(event)=> {
        event.preventDefault();
        
        if(!this.state.text){
            alert("Post can't be empty.");
            return;
        }
        
        const formData= {
            text:this.state.text
        }
        this.props.addPost(formData);  
        
        this.setState({
            text:""
        })
    }
    
    render(){
        return(

          <div className="post-form">
            <div className="bg-primary p">
              <h3>Say Something...</h3>
            </div>
            <form className="form my-1">
              <textarea value={this.state.text} onChange={this.handleTextarea} name="text" cols="30" rows="5" placeholder="Create a post" required></textarea>
              <input onClick={this.onSubmit} type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
          </div>
        )
    }
}


export default connect(null,{ addPost })(PostForm);


