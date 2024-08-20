import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();


  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Click on the trips button below to being planning your adventure!</p>
      {/* <LogOutButton className="btn" /> */}
      <Button className="btn" variant="contained" type="button" 
      sx={{backgroundColor: '#718060'}}
          onClick={() => {
            history.push('/trips');
          }}>Trips</Button>
      {/* <button
          type="button"
          onClick={() => {
            history.push('/trips');
          }}
        >
          Trips
        </button> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
