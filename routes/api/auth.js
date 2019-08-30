const express= require("express");
const router= express.Router();
const {User}= require('../../models/User');

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

//getting authenticated user details
router.get('/',isAuthenticated,(req,res)=>{
    
    User.findById(req.user.id).select('-password').then((user)=> {
        res.send(user);
    }).catch(err=> {
        console.log(err.message);
        res.status(500).send('Server Error');
    })
    
})

module.exports= router;