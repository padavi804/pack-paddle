import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

  

function Trips() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [pastTripList, setPastTripList] = useState ([]);
  const [pastTrip, setPastTrip] = useState ('');

useEffect(() => {
  fetchTrips();
}, []);

const fetchTrips = () => {
  axios.get('/api/trips').then((response) => {
    setPastTripList(response.data);
  }).catch((error) => {
    console.log(error);
    alert('Something went wrong getting the trips.');
  });
}

  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div className="past-trips">
        <h2>Past Trips</h2>
        <p>Hardcoded past trips</p>
        <p>Seagull Lake</p>
        <p>Gunflint Lake</p>
        <p>Sawbill Lake</p>
        <p>Missing Link Lake</p>
        {pastTripList.map(trips => {
          return <div className="list" key={trips.id}>
            <p>{trips.entryid}</p>
            <p>{trips.entry_date}</p>            
            </div>
        })}
      </div>
      <br/>
      <div className='newTrip'>
      <button
          type="button"
          onClick={() => {
            history.push('/newtrip');
          }}
        >
          New Trip
        </button>
      </div>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default Trips;