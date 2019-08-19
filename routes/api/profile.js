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



//getting all profiles
router.get('/',(req,res)=> {
    
    Profile.find().populate('user').then((profiles)=> {
        
        res.send(profiles);
        
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Server error");
    }) 
})



//profile of me
router.get('/my_profile',isAuthenticated,(req,res)=>{
    
    Profile.findOne({user:req.user.id}).populate('user').then((profile)=> {
        
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



//profile of each user by using profile_id
router.get('/user/:id',isAuthenticated,(req,res)=>{
    
    Profile.findById(req.params.id).populate('user').then((profile)=> {
        
        if(profile){
            res.send(profile);
        }else{
            res.send(`user needs to create your profile`);
        }
    }).catch((err)=> {
        console.log(err);
        res.send("Server error");
    });    
})



//creating my profile..UI
router.get('/create',isAuthenticated,(req,res)=>{
    
       Profile.findOne({user:req.user.id}).populate('user').then((profile)=> {
        
            if(profile){
                res.send(`Hello ${req.user.name}, your profile already exists.`);
            }
            else{
                res.send("UI to create your profile");
            }    
       })
})



//creating my profile..POST request
router.post('/create',isAuthenticated,(req, res) => {

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      
      //social
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,    
    } = req.body;
    
    
    Profile.findOne({user:req.user.id}).populate('user').then((profile)=> {
        
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



//editing my profile..UI
router.get('/edit_profile',isAuthenticated,(req,res)=>{
    
    Profile.findOne({user:req.user.id}).populate('user').then((profile)=> {
        
        if(!profile){
            res.send(`Hello ${req.user.name}, you need to create your profile first.`);
        }
        else{
            res.send("UI to edit your profile");
        }    
    })
});



//editing my profile..PUT request
router.put('/edit_profile',isAuthenticated,(req,res)=>{
    
     const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      
      //social
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
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
    
    
    Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true}).populate('user').then((profile)=> {
        
        res.send(profile);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        }) 

})



//deleting my profile
router.delete('/delete',isAuthenticated,(req,res)=> {
    
    Profile.findOneAndRemove({user:req.user.id}).then(()=> {
        
        User.findByIdAndRemove(req.user.id).then((user)=> {
            
            res.send(`yours (${user.name}'s) account is deleted`);
        })
    })
})



router.put('/experience',isAuthenticated, (req, res) => {
   
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    let new_experience = {};
    if (title) new_experience.title = title;
    if (company) new_experience.company = company;
    if (location) new_experience.location = location;
    if (from) new_experience.from = from;
    if (to) new_experience.to = to; 
    if (current) new_experience.current = current;
    if (description) new_experience.description = description; 
    

    Profile.findOne({ user: req.user.id }).then((profile)=> {
        
        profile.experience.unshift(new_experience);
        
        profile.save().then(profile=> {
         res.send(profile);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        })
        
    })    
});



router.put('/education',isAuthenticated,(req, res) =>{
   
    const {
      college,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    let new_education = {};
    if (college) new_education.college = college;
    if (degree) new_education.degree = degree;
    if (fieldofstudy) new_education.fieldofstudy = fieldofstudy;
    if (from) new_education.from = from;
    if (to) new_education.to = to;
    if (current) new_education.current = current;
    if (description) new_education.description = description;

      
    Profile.findOne({ user: req.user.id }).then((profile)=> {
        
        profile.education.unshift(new_education);
        
        profile.save().then(profile=> {
         res.send(profile);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        })
        
    })     
 });







module.exports= router;