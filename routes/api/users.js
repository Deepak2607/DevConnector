const express= require("express");
const bcrypt = require('bcryptjs');
const gravatar= require('gravatar');
const router= express.Router();
const {User}= require('../../models/User');


router.get('/',(req,res)=>{
    res.send("users works");
})

router.post('/',(req,res)=>{
    
    let errors=[];
    let isEmail=  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email);
    
    if(!req.body.name){
        errors.push({message:'Enter name'});
    }
    if(!req.body.email){
        errors.push({message:'Enter email'});
    }  
    if(!isEmail){
        errors.push({message:'Invalid email'});
    }
    if(!req.body.password){
        errors.push({message:'Enter password'});
    }
    if(req.body.password.length<4){
        errors.push({message:'Password length must be greater than 4'});
    }
    
    
    if(errors.length>0){
        res.status(400).send(errors);
    }
    else{
        
        User.findOne({ email: req.body.email}).then((user)=> {
            if(user){
               res.send("user exists");
            }
            else{
                bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {

                    const avatar= gravatar.url(req.body.email,{
                        s:'200',
                        r:'pg',
                        d:'mm'
                    })

                    const user= new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        avatar:avatar
                    });

                    user.save().then(()=> {
                        res.send('user saved');
                    }).catch((err)=> {
                        console.log(err);
                        res.status(500).send("Server error");
                    });

                 });
              });
            }
        })
    }   
    

    
})

module.exports= router;