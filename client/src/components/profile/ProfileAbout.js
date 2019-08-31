import React from 'react';

const ProfileAbout= (props)=> {
    
    return(
        
        <div className="profile-about bg-light p-2">
        
         {(props.profile.bio) ? (
          <div>
          <h2 className="text-primary">{props.profile.user.name}'s Bio </h2>
          <p>{props.profile.bio}</p>
          </div>
          ) : null }

          <div className="line"></div>
    
          <h2 className="text-primary">Skills</h2>
          <div className="skills">
            {props.profile.skills.map((skill,index) => {
              return(
                <div key={index} className="p-1"><i className="fa fa-check"></i>{skill}</div>
              ) 
            })}     
          </div>
    
        </div>
    )
}

export default ProfileAbout