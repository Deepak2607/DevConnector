const express= require("express");
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


router.get('/',(req,res)=>{
    res.send(`${req.isAuthenticated()}`);
})

module.exports= router;