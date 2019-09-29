import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props) => (
  <Route 
    render={() => (! props.isAuthenticated && ! props.loading ) ? ( <Redirect to='/login' />) : (<props.component />)
  }/>
);


const mapStateToProps = state => ({
  isAuthenticated: state.auth_reducer.isAuthenticated,
  loading:state.auth_reducer.loading
});

export default connect(mapStateToProps)(PrivateRoute);