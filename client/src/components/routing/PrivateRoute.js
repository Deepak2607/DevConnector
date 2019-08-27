import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props) => (
  <Route 
    render={() => (! props.isAuthenticated) ? ( <Redirect to='/login' />) : (<props.component />)
  }/>
);


const mapStateToProps = state => ({
  isAuthenticated: state.auth_reducer.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
