import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import store from '../../store';

const Profiles = (props) => {
    
    
    useEffect(() => {
        store.dispatch(getProfiles());
      }, []);

      return (
          
           <div>
            {props.loading ? (<div> loading.. </div>) : (
             
            <div>
           
              <h1 className='large text-primary'>Developers</h1>
              <p className='lead'>
                <i className='fab fa-connectdevelop' /> Browse and connect with developers
              </p>
           
              <div className='profiles'>
                {props.profiles.length > 0 ? ( props.profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No profiles found...</h4>
                )}
              </div>

            </div>
            )}
           </div>
    );
}


const mapStateToProps = state => ({
  profiles: state.profile_reducer.profiles,
  loading: state.profile_reducer.loading
});

export default connect(mapStateToProps,{ getProfiles })(Profiles);
