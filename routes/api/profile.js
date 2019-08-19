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


router.get('/profile/:id',isAuthenticated,(req,res)=>{
    
    Profile.findById(req.params.id).populate('users').then((profile)=> {
        
        if(profile){
            res.send(profile);
        }else{
            res.send(`you need to create your profile, ${req.user.name}`);
        }
    }).catch((err)=> {
        console.log(err);
        res.send("Server error");
    });    
})

//
//router.post('/',(req,res)=> {
//    
////    let errors= [];
////    if(!req.body.company){
////        errors.push({message:'Enter name'});
////    }
////    if(!req.body.website){
////        errors.push({message:'Enter email'});
////    }  
////    if(!req.body.location){
////        errors.push({message:'Invalid email'});
////    }
////    if(!req.body.status){
////        errors.push({message:'Enter password'});
////    }
//    
//    res.send(req.body);
//   
//    
//    
//})


router.get('/create',isAuthenticated,(req,res)=>{
    
       Profile.findOne({user:req.user.id}).populate('users').then((profile)=> {
        
            if(profile){
                res.send(`Hello ${req.user.name}, your profile already exists.`);
            }
            else{
                res.send("UI to create your profile");
            }    
       })
})



router.post('/create',isAuthenticated,(req, res) => {

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    
    
    Profile.findOne({user:req.user.id}).populate('users').then((profile)=> {
        
        if(profile){
            res.send(`Hello ${req.user.name}, your profile already exists.`);
        }
        else{
            // Build profile object
            const profileFields = {};
            profileFields.user = req.user.id;
            if (company) profileFields.company = company;
            if (website) profileFields.website = website;
            if (location) profileFields.location = location;
            if (bio) profileFields.bio = bio;
            if (status) profileFields.status = status;
            if (githubusername) profileFields.githubusername = githubusername;
            if (skills) {
              profileFields.skills = skills.split(',').map(skill => skill.trim());
            }

            // Build social object (inside profile object)
            profileFields.social = {};
            if (youtube) profileFields.social.youtube = youtube;
            if (twitter) profileFields.social.twitter = twitter;
            if (facebook) profileFields.social.facebook = facebook;
            if (linkedin) profileFields.social.linkedin = linkedin;
            if (instagram) profileFields.social.instagram = instagram;

            const profile= new Profile(profileFields);

            profile.save().then(profile=> {
                 res.send(profile);
            }).catch(err=>{
                console.log(err);
                res.status(500).send("Server error");
            })
        }
    })  
  }
);


router.get('/edit/:id',isAuthenticated,(req,res)=>{
    
    Profile.findById(req.params.id).populate('users').then((profile)=> {
        
        if(!profile){
            res.send(`Hello ${req.user.name}, you need to create your profile first.`);
        }
        else{
            res.send("UI to edit your profile");
        }    
    })
});


router.put('/edit/:id',(req,res)=>{
    
     const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;
    
    
    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object (inside profile object)
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    
    Profile.findByIdAndUpdate(req.params.id,{$set:profileFields},{new:true}).populate('users').then((profile)=> {
        
        res.send(profile);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        }) 

})


router.get('/',(req,res)=> {
    
    Profile.find().populate('users').then((profiles)=> {
        
        res.send(profiles);
        
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Server error");
    }) 
})










module.exports= router;