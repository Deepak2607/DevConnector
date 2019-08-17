const express= require("express");
const {Profile}= require("../../models/Profile");
const {User}= require('../../models/User');
const router= express.Router();



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


router.get('/',isAuthenticated,(req,res)=>{
    
    Profile.findOne({user:req.user.id}).populate('users').then((profile)=> {
        
        if(profile){
            res.send(profile);
        }else{
            res.send(`there is no profile for ${req.user.name}`);
        }
    }).catch((err)=> console.log(err));
    
})










module.exports= router;