import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = (props) => {
    
  const educations = props.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.college}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{moment.utc(edu.from)}</Moment> -{' '}
        {edu.to === null ? (' Now') : (
          <Moment format="DD/MM/YYYY">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button onClick={()=>props.deleteEducation(edu._id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      
      <table className="table">
      
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
      
        <tbody>
         {educations}
        </tbody>
      
      </table>
    </Fragment>
  );
};


export default connect(null, { deleteEducation })(Education);
