import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = (props) => {
  
  const experiences = props.experience.map(exp => {
      
    return(
        
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td className="hide-sm">{exp.title}</td>
          <td>
            <Moment format="DD/MM/YYYY">{moment.utc(exp.from)}</Moment> -{' '}
            {exp.to === null ? (' Now') : (
            <Moment format="DD/MM/YYYY">{moment.utc(exp.to)}</Moment>
            )}
          </td>
          <td>
            <button onClick={()=>props.deleteExperience(exp._id)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
        
    )
  });

  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
      
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
      
        <tbody>
          {experiences}
        </tbody>
      
      </table>
    </div>
  );
};


export default connect(null,{ deleteExperience })(Experience);
