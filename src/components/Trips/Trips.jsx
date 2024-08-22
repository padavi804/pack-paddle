import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Trips() {
  const user = useSelector((store) => store.user);
  const detail = useSelector((store) => store.detail);
  const trips = useSelector((store) => store.trips)
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS', payload: user.id});
  }, []);

// useEffect(() => {
//   fetchTrips();
// }, []);

// const fetchTrips = () => {
//   axios.get('/api/trips').then((response) => {
//     setPastTripList(response.data);
//   }).catch((error) => {
//     console.log(error);
//     alert('Something went wrong getting the trips.');
//   });
// }

const handleClick = (id) => {
  console.log(id)
  history.push(`/dashboard/${id}`);
};


  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      
        <h2>Past Trips</h2>
        {trips.map((trip) => {
          return (
          
          <div className="list" key={trip.id} >
            <p>{trip.entry_point}</p>
            <p>{trip.entry_date}</p>
            <p>{trip.id}</p> 
            <button 
            onClick={() => handleClick(trip.id)}
            >Visit Trip </button>          
            </div>
        )})}
     
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
    </div>
  );
}

export default Trips;