import React, { useEffect } from 'react';
import { getGithubRepos } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store';

const ProfileGithub= (props)=> {
    
    useEffect(() => {
        store.dispatch(getGithubRepos(props.profile.githubusername));
    }, []);
    
//    console.log(props.repos);
    
    return(
         <div className="profile-github"> 
         
              <h2 className="text-primary my-1">
                <i className="fab fa-github"></i> Github Repos
              </h2>
        
              {(props.repos) ? (
        
                 <div>
                 {props.repos.map(repo=> { 
                  
                  return(
                     <div key={repo.id} className="repo bg-white p-1 my-1">

                        <div>
                          <h4><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></h4>
                          <p>{repo.description}</p>
                        </div>

                        <div>
                          <ul>
                            <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                            <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                            <li className="badge badge-light">Forks: {repo.forks_count}</li>
                          </ul>
                        </div> 

                     </div>
                  )       
                })}
                </div>

              ) : <div>No Repositories</div> }
      
        </div>
           
    )
}


const mapStateToProps = state => ({
  repos:state.profile_reducer.repos,
});

export default connect(mapStateToProps,{ getGithubRepos })(ProfileGithub);
