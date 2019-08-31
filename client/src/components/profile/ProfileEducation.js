import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';

const ProfileEducation=(props)=> {
    
    return(
    
        <div className="profile-edu bg-white p-2">
          <h2 className="text-primary">Education</h2>
        
          {(props.profile.education.length>0) ? (
           
              <div>
              {props.profile.education.map((edu)=> {
               
                  return(
                      <div key={edu._id}>
                        <h3 className="text-dark">{edu.college}</h3>
                        <p>
                          <Moment format="DD/MM/YYYY">{moment.utc(edu.from)}</Moment> -{' '}
                          {!edu.to ? ' Now' : <Moment format="DD/MM/YYYY">{moment.utc(edu.to)}</Moment>}
                        </p>
                        <p><strong>Degree: </strong>{edu.degree}</p>
                        <p><strong>Field of study: </strong>{edu.fieldofstudy}</p>
                        {(edu.description) ? ( 
                         <p><strong>Description: </strong>{edu.description}</p>
                         ) : null } 
                      </div>
                   ) 
              })}
              </div>

          ) : <div>No Education</div> }
        
          
        
        </div>
        
    )
}

export default ProfileEducation