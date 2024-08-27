import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserPage.css'

function UserPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();


  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      <div className="text">
      {/* <p>Your ID is: {user.id}</p> */}
      <p>Click on the trips button below to being planning your adventure!</p>
      </div> 
      <br/>
      <button className="btn" variant="contained" type="button" 
          onClick={() => {
            history.push(`/trips/${user.id}`);
          }}>Trips
          </button>    
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
