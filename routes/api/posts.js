const express= require("express");
const router= express.Router();

const {Profile}= require("../../models/Profile");
const {User}= require('../../models/User');
const {Post}= require('../../models/Post');


const isNotAuthenticated= (req,res,next)=> {
    if(! req.isAuthenticated()){
        next();
    }else{
        res.send('You need to logout first');
    }
}

const isAuthenticated= (req,res,next)=> {
    if(req.isAuthenticated()){
        next();
    }else{
        res.send('You need to login first');
    }
}


router.get('/',isAuthenticated ,(req,res)=>{
    
    Post.find().sort({date:-1}).then(posts=> {
        res.send(posts);
    }).catch(err=> {
        console.log(err);
        res.send("server errror");
    })
    
})



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
        res.send("server error");
    })
    
})


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
        res.send("server error");
    })
    
})


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





module.exports= router;