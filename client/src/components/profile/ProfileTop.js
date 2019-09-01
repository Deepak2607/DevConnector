import React from 'react';


const ProfileTop= (props)=> {
    
    console.log(props.profile);
    
    return(
        <div className="profile-top bg-primary p-2">
        
          <img className="round-img my-1" src={props.profile.user.avatar} alt=""/>
          <h1 className="large">{props.profile.user.name}</h1>
          <p className="lead">{props.profile.status} {(props.profile.company) ?
           <span> at {props.profile.company}</span> :
          null } </p>
          <p>{(props.profile.location) ?
           <span>{props.profile.location}</span> :
          null }</p>
        
        
          <div className="icons my-1">
            
            {(props.profile.website) ? (
            <a href={props.profile.website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe fa-2x"></i>
            </a>
            )  : null }
        
            {(props.profile.social && props.profile.social.twitter) ? (
            <a href={props.profile.social.twitter} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            )  : null }

            {(props.profile.social && props.profile.social.facebook) ? (
            <a href={props.profile.social.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            ) : null }

            {(props.profile.social && props.profile.social.linkedin) ? (
            <a href={props.profile.social.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            ) : null }

             {(props.profile.social && props.profile.social.youtube) ? (
             <a href={props.profile.social.youtube} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube fa-2x"></i>
            </a>
            ) : null }

            {(props.profile.social && props.profile.social.instagram) ? (
            <a href={props.profile.social.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            ) : null }
        
          </div>
        
        </div>
    
    
    )
}


export default ProfileTop