const express= require("express");
const request= require("request");
const axios= require("axios");
const {Profile}= require("../../models/Profile");
const {User}= require('../../models/User');
const router= express.Router();


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


//remember how to populate..and why populate
//getting all profiles
//actual data in profiles collection is same (i.e. user is userId), it is populated here to get user information also, but there will be no any change in profiles collection, it will remain same..(user-> userId)
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
            res.status(400).send(`you need to create your profile ${req.user.name}`);
        }
    }).catch((err)=> {
        console.log(err);
        res.status(500).send("Server error");
    });    
})



//profile of each user by... user_id
router.get('/user/:id',(req,res)=>{
    
    Profile.findOne({user:req.params.id}).populate('user').then((profile)=> {
        
        if(!profile){
            return res.status(404).send("profile not found");   
        }
        res.send(profile);
        
    }).catch((err)=> {
        console.log(err);
        if(err.kind=="ObjectId"){
            return res.status(404).send("profile not found");
        }
        res.status(500).send("Server error");
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

    //destructuring
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
    
    
    let errors=[];   
    if(!status){
        errors.push({message:'Status is required'});
    }
    if(!skills){
        errors.push({message:'Skills are required'});
    }
    
    if(errors.length >0){
        res.status(400).send(errors);
        return;
    }


    const profile= new Profile(profileFields);

    profile.save().then(profile=> {
         res.send(profile);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Server error");
    })
});



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
    
    
    let errors=[];   
    if(!status){
        errors.push({message:'Status is required'});
    }
    if(!skills){
        errors.push({message:'Skills are required'});
    }
    
    if(errors.length >0){
        res.status(400).send(errors);
        return;
    }
    
    
    Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true}).populate('user').then((profile)=> {
        
      res.send(profile);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Server error");
    }) 

})



//deleting my profile (and account also) 
router.delete('/delete',isAuthenticated,(req,res)=> {
    
    Profile.findOneAndRemove({user:req.user.id}).then(()=> {
        
        User.findByIdAndRemove(req.user.id).then((user)=> {
            
            res.send(`yours (${user.name}'s) profile and account are deleted`);
        }).catch(err=> {
            res.status(500).send("Server error");
        })
    })
})



//adding eperience in my profile
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
    
    
//    let errors=[];   
//    if(!title){
//        errors.push({message:'Title is required'});
//    }
//    if(!company){
//        errors.push({message:'Company is required'});
//    }
//    if(!from){
//        errors.push({message:'"From date" is required'});
//    }
//    
//    if(errors.length >0){
//        res.status(400).send(errors);
//        return;
//    }
    

    Profile.findOne({ user: req.user.id }).then((profile)=> {
        
        //way to add an element in an array..unshift adds in front and..push adds in back
        profile.experience.unshift(new_experience);
        
        profile.save().then(profile=> {
         res.send(profile);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        })
        
    })    
});


//adding education in my profile
router.put('/education',isAuthenticated,(req, res) =>{
   
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    let new_education = {};
    if (school) new_education.college = school;
    if (degree) new_education.degree = degree;
    if (fieldofstudy) new_education.fieldofstudy = fieldofstudy;
    if (from) new_education.from = from;
    if (to) new_education.to = to;
    if (current) new_education.current = current;
    if (description) new_education.description = description;
    
    
//    let errors=[];   
//    if(!school){
//        errors.push({message:'School is required'});
//    }
//    if(!degree){
//        errors.push({message:'Degree is required'});
//    }
//    if(!fieldofstudy){
//        errors.push({message:'Field of study is required'});
//    }
//    if(!from){
//        errors.push({message:'"From date" is required'});
//    }
//    
//    if(errors.length >0){
//        res.status(400).send(errors);
//        return;
//    }

      
    Profile.findOne({ user: req.user.id }).then((profile)=> {
        
        //way to add an element in an array..unshift adds in front and..push adds in back
        profile.education.unshift(new_education);
        
        profile.save().then(profile=> {
         res.send(profile);
        }).catch(err=>{
            console.log(err);
            res.status(500).send("Server error");
        })
        
    })     
 });


//delete an experience from my profile (using experience_id)
router.delete('/experience/:exp_id',isAuthenticated,(req, res) => {
  
    Profile.findOne({ user: req.user.id }).then(profile =>{
            
//        profile.experience.forEach(experience => {
//            if(experience.id===req.params.exp_id){   
//                profile.experience.splice(experience.id, 1);
//            }
//        })
        
        const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
    
        profile.save().then(()=> {  
            res.send(profile);
        }).catch(err=> {
            console.log(err);
            res.status(500).send("Server error");
        })
    })
})



//delete an education from my profile (using education_id)
router.delete('/education/:edu_id',isAuthenticated,(req, res) => {
  
    Profile.findOne({ user: req.user.id }).then(profile =>{
            
        //remember another way to delete an element from an array
        let educationlist_updated= profile.education.filter(education => {
            return (education.id!==req.params.edu_id); 
        })
        profile.education= educationlist_updated;
    
        profile.save().then(()=> {  
            res.send(profile);
        }).catch(err=> {
            console.log(err);
            res.status(500).send("Server error");
        })
    })
})


//getting any user's github repos
router.get('/github/:username', (req, res) => {

    const clientId= 'Iv1.06a4619e1629aa2f';
    const clientSecret= 'f56bf99620e07c8421e6dc79322807786edf73c2';
    
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos? 
per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${clientSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error){
        return res.status(500).json({ msg: 'Server Error' });
      } 
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
});







module.exports= router;