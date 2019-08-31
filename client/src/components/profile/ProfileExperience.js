import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileExperience=(props)=> {
    
    return(
    
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
        
          {(props.profile.experience.length>0) ? (
           
              <div>
              {props.profile.experience.map((exp)=> {
               
                  return(
                      <div key={exp._id}>
               
                        <h3 className="text-dark">{exp.company}</h3>
        
                        <p>
                          <Moment format="DD/MM/YYYY">{moment.utc(exp.from)}</Moment> -{' '}
                          {!exp.to ? ' Now' : <Moment format="DD/MM/YYYY">{moment.utc(exp.to)}</Moment>}
                        </p>
    
                        <p><strong>Position: </strong>{exp.title}</p>
                            
                        {(exp.description) ? ( 
                         <p><strong>Description: </strong>{exp.description}</p>
                         ) : null }
                        
                      </div>
                   ) 
              })}
              </div>

          ) : <div>No Experience</div> }
        
          
        
        </div>
        
    )
}

export default ProfileExperience