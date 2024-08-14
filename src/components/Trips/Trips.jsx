import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Trips() {
  const user = useSelector((store) => store.user);
  const trips = useSelector((store) => store.trips);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS', payload: id });
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
  console.log(trips.id)
  history.push(`/dashboard/${id}`);
};


  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      <div className="past-trips" key={trips.id}>
        <h2>Past Trips</h2>
        {trips.map(trip => {
          return <div className="list" key={trip.id} >
            <p>{trip.entry_point}</p>
            <p>{trip.entry_date}</p> 
            <button onClick={handleClick}>Visit Trip </button>          
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
    </div>
  );
}

export default Trips;