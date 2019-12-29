const express= require("express");
const router= express.Router();

const {Profile}= require("../../models/Profile");
const {User}= require('../../models/User');
const {Post}= require('../../models/Post');


const isNotAuthenticated= (req,res,next)=> {
    if(! req.isAuthenticated()){
        next();
    }else{
        res.status(400).send('You need to logout first');
    }
}

const isAuthenticated= (req,res,next)=> {
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(400).send('You need to login first');
    }
}


//getting all posts (from all users)
router.get('/',isAuthenticated ,(req,res)=>{
    
    Post.find().sort({date:-1}).then(posts=> {
        res.send(posts);
    }).catch(err=> {
        console.log(err);
        res.status(500).send("server errror");
    })
    
})


//getting a specific post (using post_id)
router.get('/:id',isAuthenticated ,(req,res)=>{
    
    Post.findById(req.params.id).then(post=> {
        
        if(!post){
            return res.status(404).send("post not found");
        }
        res.send(post);
        
    }).catch(err=> {
        if(err.kind=="ObjectId"){
            return res.status(404).send("post not found");
        }
        console.log(err);
        res.status(500).send("server error");
    })
    
})


//deleting my post using post_id (can not others)
router.delete('/:id',isAuthenticated ,(req,res)=>{
    
    Post.findById(req.params.id).then(post=> {
        
        if(!post){
            return res.status(404).send("post not found");
        }
        if(post.user.toString()!==req.user.id){
            return res.status(401).send("You are not authorised");
        }
        
        post.remove().then(()=> {
            res.send("post is successfully removed");
        })
        
    }).catch(err=> {
        console.log(err);
        if(err.kind=="ObjectId"){
            return res.status(404).send("post not found");
        }
        res.status(500).send("server error");
    })
    
})



//creating a post
router.post('/',isAuthenticated ,(req,res)=>{
    
    User.findById(req.user.id).then(user=> {
        
        const post= new Post({ 
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        
        post.save().then(post=> { 
            res.send(post);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        })
    })
})


//like/unlike to a post (id is post_id)
router.put('/likes/:id',isAuthenticated,(req,res)=> {
    
    Post.findById(req.params.id).then(post=> {
        
        
//    // Check if the post has already been liked
//    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
//        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
//        post.likes.splice(removeIndex, 1);    
//    }
//    else{
//        post.likes.unshift({ user: req.user.id });
//    }
        
         // Checking the post has already been liked or not
        let flag=0;
        post.likes.forEach(like=> {
            if(like.user.toString() === req.user.id){
                flag=1;
            }
        })
        
        //if not..then add (below is the way to add an element in an array...remember)
        if(flag==0){
            post.likes.unshift({user:req.user.id});
        }
        //if already liked..then remove (below is the way to remove an element from an array...remember)
        else if(flag==1){
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
        }
        
        post.save().then(post=> {
            res.send(post.likes);
        }).catch(err=> {
            console.log(err);
            res.status(500).send("server error");
        })
        
        
    })
})


//comment to a post (id is post_id)
router.post('/comment/:id',isAuthenticated,(req,res)=> {
    
    Post.findById(req.params.id).then(post=> {
        
        User.findById(req.user.id).then(user=> {
            
            let comment= {
                user:req.user.id,
                text:req.body.text,
                name:user.name,
                avatar:user.avatar        
            }

            post.comments.unshift(comment);
            post.save().then(post=> {
                res.send(post.comments);
            }).catch(err=> {
                console.log(err);
                res.status(500).send("server error");
            })
            
        })
    })
})


//deleting a comment (post_id, comment_id)
router.delete('/comment/:id/:cmt_id',isAuthenticated,(req,res)=> {
    
    Post.findById(req.params.id).then(post=> {
           
        let flag=2,removeIndex;
        post.comments.forEach(comment=> {
            if(comment.id === req.params.cmt_id && req.user.id === comment.user.toString()){
                flag=1;
            }
            else if(comment.id === req.params.cmt_id && req.user.id !== comment.user.toString()){
                flag=0;      
            } 
        })
            
        if(flag==2){
            return res.status(400).send("comment not found");
        }
        if(flag==0){
            return res.status(401).send("you are not authorised to delete this comment");
        }
        
        
        //this is the way to delete an element from an array..remember this concept 
        removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.cmt_id);
        post.comments.splice(removeIndex,1);
        
        post.save().then(post=> {
            res.send(post.comments);
        }).catch(err=> {
            console.log(err);
            res.status(500).send("server error");
        })
          
    })
})





module.exports= router;