const express= require("express");
const bcrypt = require('bcryptjs');
const gravatar= require('gravatar');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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


router.get('/login', (req,res)=> {

    res.status(400).send('invalid credentials');
})

router.get('/register',isNotAuthenticated, (req,res)=> {
    res.send('register page');
})

//router.post('/deepak',(req,res)=> {
//    console.log(req.body);
//})

router.post('/register',(req,res)=>{
    
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
        errors.push({message:'Password length must be greater than 3'});
    }
    
    
    if(errors.length>0){
        res.status(400).send(errors);
    }
    else{
        
        User.findOne({ email: req.body.email}).then((user)=> {
            if(user){
               
               let error= [{message:'User with this email already exists'} ]
               res.status(400).send(error);
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




passport.use(new LocalStrategy({usernameField: 'email'},
  (email, password, done)=> {
    
    User.findOne({email:email}).then((user)=> {
        
      if (!user) {
        return done(null, false);
      }
        
        bcrypt.compare(password, user.password,(err, matched)=> {
            
                if(matched){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
        });
    })
   }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login',
  passport.authenticate('local'
                        , {successRedirect: '/auth',
                          failureRedirect: '/users/login',
                          failureFlash: 'Invalid username or password.',
                          successFlash: 'Welcome!'}
                       ));


router.get('/logout',(req, res)=>{
  req.logout();
  res.redirect('/users/login');
});






module.exports= router;